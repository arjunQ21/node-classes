
import catchAsync from "../helpers/catchAsync.js";
import Group from "../models/group.js";

import GroupMember from "../models/groupMember.js";
import Message from "../models/message.js";
import message from "../validations/message.js";

const sendMessage= catchAsync(async(req,res)=>{
    const groupId=req.params.groupId;
    const existingGroup=Group.findOne({_id:groupId})
    if(!existingGroup){
        throw new Error ("Group not found")
    }
    const existingGroupMember=await GroupMember.find({userId: req.user._id, groupId: groupId})
    if(!existingGroupMember){
        throw new Error ("User didnot joined the group")
    }
    if (!req.file) {
        throw new Error("File not uploaded.");
    }

    const {content}=req.body;

    const newMessage=(
        await Message.create({
            sender:req.user._id,
            groupId:groupId,
            content:content,
            file:req.file.path
        })
    )
    return res.json({
        newMessage
    })
})

const getMessage = catchAsync(async (req, res) => {
    const groupId = req.params.groupId;

    // Ensure to await the group query
    const existingGroup = await Group.findOne({ _id: groupId });
    if (!existingGroup) {
        throw new Error("Group not found");
    }

    // Check if the user is a member of the group
    const existingGroupMember = await GroupMember.findOne({ userId: req.user._id, groupId: groupId });
    if (!existingGroupMember) {
        throw new Error("User did not join the group");
    }

    // Get all messages for the group
    const allMessages = await Message.find({ groupId: groupId });


    // Add the user's ID to seenMessageID if it's not already there
    if (!existingGroupMember.seenMessageID.includes(req.user._id)) {
        existingGroupMember.seenMessageID.push(req.user._id);
        await existingGroupMember.save();
    }

    return res.json({
        message: allMessages
    });
});

const editMessage=catchAsync(async(req,res)=>{
    const groupId=req.params.groupId;
    const messageId=req.params.messageId;

    const existingGroup=await Group.findOne({_id:groupId});
   
    if(!existingGroup){
        throw new Error("Group not found")
    }

    const existingGroupMember=await GroupMember.findOne({groupId:groupId,userId:req.user._id});

    if(!existingGroupMember){
        throw new Error ("User didnot join the group")
    }

    const existingMessage=await Message.findOne({_id:messageId})
    if(!existingMessage){
        throw new Error("Message ID not found")
    }

    if(existingMessage.sender.toString()!==req.user._id.toString()){
        throw new Error ("Only the one who create the message can edit the message")
    }

    existingMessage.content=req.body.content;
    existingMessage.file=req.file.path
    await existingMessage.save()

    return res.json({
        message:"Message successfully updated",
        message:existingMessage
    })
})


const deleteMessage=catchAsync(async(req,res)=>{
    const groupId=req.params.groupId;
    const messageId=req.params.messageId;

    const existingGroup=await Group.findOne({_id:groupId});
   
    if(!existingGroup){
        throw new Error("Group not found")
    }

    const existingGroupMember=await GroupMember.findOne({groupId:groupId,userId:req.user._id});

    if(!existingGroupMember){
        throw new Error ("User didnot join the group")
    }

    const existingMessage=await Message.findOne({_id:messageId})
    if(!existingMessage){
        throw new Error("Message ID not found")
    }

    if(existingMessage.sender.toString()!==req.user._id.toString() && existingGroup._id.toString()!==req.user._id.toString()){
        throw new Error ("Only the one who create the message can edit the message")
    }

    await Message.deleteOne({_id:messageId})

    return res.json({
        message:"Successfully message deleted"
    })

})
const getSingleMessage=catchAsync(async(req,res)=>{
    const groupId=req.params.groupId;
    const messageId=req.params.messageId

    const existingGroup=await Group.findOne({_id:groupId});
    if(!existingGroup){
        throw new Error ("Group Id not found");
    }

    const existingGroupMember=await GroupMember.findOne({userId:req.user._id,groupId:groupId});
    if(!existingGroupMember){
        throw new Error ("User didnot joined the group")
    }
    const existingMessage=await Message.findOne({_id:messageId});
    if(!existingMessage){
        throw new Error("Message id not found")
    }
    return res.json({
        message:existingMessage
    })
})

const messageController={
    sendMessage,getMessage,editMessage,deleteMessage,getSingleMessage
}

export default messageController;