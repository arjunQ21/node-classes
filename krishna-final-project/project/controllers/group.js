import catchAsync from "../helpers/catchAsync.js";
import Group from "../models/group.js";
import GroupMember from "../models/groupMember.js";

const CreateGroup=catchAsync(async(req,res)=>{
    const { name,description,creatorID,isPrivate}=req.body;
    const existingGroup=await Group.findOne({name:req.body.name});

    if(existingGroup){
        throw new Error ("Group Name already exist")
    }
    const newGroup=await Group.create({
        name,description,creatorID,isPrivate
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


const GroupController={CreateGroup,ViewAllPublicGroup};

export default GroupController;