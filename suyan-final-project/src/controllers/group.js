import { catchAsync } from "../helpers/catchAsync.js";
import { createJWT, findGroupByName, findUserbyemail } from "../services/user.js";
import User from '../models/user.js';
import Group from "../models/group.js";
import groupMember from "../models/groupMember.js";

//To create a new group
const createGroup = catchAsync (async function(req,res){

  const { name, description , isPrivate} = req.body;

  const existingName = await findGroupByName(name);
  if (existingName){
    throw new Error("Group Name already exists . Please use different group name")
  }
  const group = await Group.create(
    { ...req.body, creatorID: req.user._id }
  )
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

  const groupId = req.params.groupID;
  console.log(groupId);
  const group = await Group.findOne({_id: groupId})
  if(!group){
    throw new Error("Not found any group with given groupID")
  }

  // const existingUser = req.body.userId;
 
  const {memberId} = req.body;

  const Member = await User.findOne({_id: memberId});
  const currentDate = new Date().toISOString().split('T')[0];


  const addMember = await groupMember.create({userId: Member._id, groupId: groupId, joinDate: currentDate})

 return res.json({addMember});
})

//View the groups in which a user has joined:
const viewGroups = catchAsync ( async function (req, res){
  const user = await groupMember.find({userId: req.user._id.toString()})
console.log(req.user._id.toString())
  return res.json({user});
} )
const groupController = { createGroup,viewAllGroup, addMember , viewGroups}
export default  groupController