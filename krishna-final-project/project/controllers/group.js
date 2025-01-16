import catchAsync from "../helpers/catchAsync.js";
import Group from "../models/group.js";
import GroupMember from "../models/groupMember.js";


const CreateGroup=catchAsync(async(req,res)=>{
    const { name,description,isPrivate}=req.body;
    const existingGroup=await Group.findOne({name:req.body.name});

    if(existingGroup){
        throw new Error ("Group Name already exist")
    }
    const newGroup=await Group.create({
        name,description,creatorID:req.user._id,isPrivate
    });

    return res.json({
        message:"Successfully Group Created",
        Group:{...newGroup.toObject(),_id:undefined,__v:undefined}
    })
})
const ViewAllPublicGroup=catchAsync(async(req,res)=>{
    const group=await Group.find({isPrivate:false});
    return res.json({
       group 
    })
})

const ViewGroup=catchAsync(async(req,res)=>{
    const groupId = req.params.groupId; 
    const group=await Group.findOne({_id:groupId});
   if(!group){
    throw new Error ("Group not found")
   }
    return res.json({
       group 
    })
})

const EditGroup=catchAsync(async(req,res)=>{
    const groupId = req.params.groupId; 
    const existingGroup=await Group.findOne({_id:groupId});
   if(!existingGroup){
    throw new Error ("Group not found")
   }
   
   if((existingGroup.creatorID).toString()!==(req.user._id).toString()){
    throw new Error ("Only creator can edit the group");
   }

   existingGroup.name=req.body.name;
   existingGroup.description=req.body.description;
   existingGroup.isPrivate=req.body.isPrivate;

   await existingGroup.save();
    return res.json({
       "message":"Successfully Group updated"
    })
})

const viewJoinedGroup=catchAsync(async(req,res)=>{
    
    const group=await GroupMember.find({userId:req.user._id});
    return res.json({
       group 
    })
})

const deleteGroup=catchAsync(async(req,res)=>{
    const groupId = req.params.groupId; 
    const existingGroup=await Group.findOne({_id:groupId});
   if(!existingGroup){
    throw new Error ("Group not found")
   }

   if((existingGroup.creatorID).toString()!==(req.user._id).toString()){
    throw new Error ("Only creator can delete the group");
   }

   await existingGroup.deleteOne();
    return res.json({
       "message":"Successfully Group updated"
    })
})





const GroupController={CreateGroup,ViewAllPublicGroup,ViewGroup,EditGroup,deleteGroup,viewJoinedGroup};

export default GroupController;