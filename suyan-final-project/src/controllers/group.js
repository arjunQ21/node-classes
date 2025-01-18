import { catchAsync } from "../helpers/catchAsync.js";
import { createJWT, findGroupByName, findUserbyemail } from "../services/user.js";
import User from '../models/user.js';
import Group from "../models/group.js";
import groupMember from "../models/groupMember.js";


//To create a new group
const createGroup = catchAsync (async function(req,res){
  const currentId= req.user._id.toString()
  const { name, description , isPrivate} = req.body;

  const existingName = await findGroupByName(name);
  if (existingName){
    throw new Error("Group Name already exists . Please use different group name")
  }
  const group = await Group.create(
    { ...req.body, creatorID: req.user._id }
  )

  const addYourselfToGroup = await groupMember.create(
    {groupId:  group._id.toString(),
      userId: currentId,
      joinDate: new Date().toISOString().split('T')[0]
    },
    
  );

  return res.json({group});
}  )
//To view all public group
const viewAllGroup= catchAsync (async function (req,res){

// to check for the private group
// const groupName = await Group.find({isPrivate: true});

const groupName = await Group.find({});
if(groupName.length === 0){
  throw new Error ("Not found any group")
}
return res.json(groupName);

})
//to add new member 
const addMember = catchAsync ( async function(req,res){

  const currentId= req.user._id.toString()

  const {memberId} = req.body;

  if(memberId === currentId){
    throw new Error(" You are creator of this group ---- Adding yourself  failed----Automatically, You are already in that group")
  }
  
  const groupId = req.params.groupID;
  console.log(groupId);
  const group = await Group.findOne({_id: groupId})
  if(!group){
    throw new Error("Not found any group with given groupID")
  }

  const checkMemberInGroup = await groupMember.find({
    groupId: groupId,
    userId: req.body.memberId
  })

  if(!checkMemberInGroup ){
    throw new Error("Member is already in that group")
  }
  else if(group.isPrivate === true){
    if(currentId != group.creatorID){
      throw new Error("Only admin can add members in the group ----Permission denied")
    }
  }

  // const existingUser = req.body.userId;
 
 
  const Member = await User.findOne({_id: memberId});
  const currentDate = new Date().toISOString().split('T')[0];


  const addMember = await groupMember.create({userId: Member._id, groupId: groupId, joinDate: currentDate})

 return res.json({addMember});
})

//View the groups in which a user has joined:
const viewGroups = catchAsync ( async function (req, res){
  const currentId= req.user._id.toString()
  const user = await groupMember.find({userId: currentId})

if(user.length === 0){
  throw new Error("The user hasnot joined any groups yet")
}
  return res.json({user});
} )

//Join public group
const joinPublicGroup = catchAsync ( async function ( req,res){

  const currentId= req.user._id.toString()
  const groupId = req.params.groupID;
  const checkGroup = await Group.findOne({_id: groupId});
if( !checkGroup){
  throw new Error (" Not found any group with this id")
}
if(checkGroup.isPrivate === true){
  throw new Error (" This group is private--- Permission denied")
}


const data = await groupMember.create({
  userId :currentId,
  groupId : groupId,
  joinDate : new Date().toISOString().split('T')[0]
})
return res.json({
  message: "Group Joined Successfully",
  data })
} )
//edit group
const editGroup = catchAsync(async (req, res) => {
  const groupId = req.params.groupId;
  const existingGroup = await Group.findOne({ _id: groupId });
  if (!existingGroup) {
    throw new Error("Group not found");
  }

  if (existingGroup.creatorID.toString() !== req.user._id.toString()) {
    throw new Error("Only creator can edit the group");
  }

  existingGroup.name = req.body.name;
  existingGroup.description = req.body.description;
  existingGroup.isPrivate = req.body.isPrivate;

  await existingGroup.save();
  return res.json({
    message: "Successfully Group updated"
  });
});

//delete group
const deleteGroup = catchAsync(async (req, res) => {
  const groupId = req.params.groupId;
  const existingGroup = await Group.findOne({ _id: groupId });
  if (!existingGroup) {
    throw new Error("Group not found");
  }

  if (existingGroup.creatorID.toString() !== req.user._id.toString()) {
    throw new Error("Only creator can delete the group");
  }

  await existingGroup.deleteOne();

  

  return res.json({
    message: "Successfully Group deleted"
  });
});

//remove group memeber
const removeGroupMember = catchAsync(async (req, res) => {
  const group_Id = req.params.groupId;


  const checkGroup = await Group.findOne({_id: group_Id});
  console.log(checkGroup._id.toString())
  if( !checkGroup){
    throw new Error (" Not found any group with this id")
  }

  const existingGroupMember = await groupMember.findOne({
    userId: req.body.memberId,
    groupId: checkGroup._id.toString()
  });

  if (!existingGroupMember) {
    throw new Error("User didnot join the Group");
  }

  await existingGroupMember.deleteOne();

  return res.json({
    message: "User Removed Successfully from group"
  });
});
const groupController = { createGroup,viewAllGroup, addMember , viewGroups, joinPublicGroup, editGroup, deleteGroup, removeGroupMember}
export default  groupController