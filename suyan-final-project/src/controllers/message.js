import { catchAsync } from "../helpers/catchAsync.js";

import Group from "../models/group.js";
import groupMember from "../models/groupMember.js";
import Message from "../models/message.js";



//To send a message
const sendMessage = catchAsync (async function(req,res){
  
  const groupId = req.params.groupId; // groupId

  const group = await Group.findOne({_id: groupId})
  if(!group){
    throw new Error("Not found any group with given groupID")
  }

  const currentId= req.user._id.toString()
  if (!currentId) {
    throw new Error("User ID is missing. Are you authenticated?");
  }

  const checkMemberInGroup = await groupMember.find({
    groupId: groupId,
    userId: currentId,
  })
  const admin = group.creatorID;
  if (currentId != admin|| !checkMemberInGroup) {
    throw new Error("You are not allowed to send messages in this group.");
  }

  const { content} = req.body;// actual messages

 const message = await Message.create({
  groupId: groupId,
  content: content,
  senderId: currentId
 })

  return res.json({message});
}  )

//to view message 
const viewMessage = catchAsync ( async function (req,res) {
  const groupId = req.params.groupId; // groupId

  const group = await Group.findOne({_id: groupId})
  if(!group){
    throw new Error("Not found any group with given groupID")
  }

  const currentId= req.user._id.toString()
  if (!currentId) {
    throw new Error("User ID is missing. Are you authenticated?");
  }

  const message = await Message.find({groupId: groupId})
  if(!message){
    throw new Error("Message not found in this group")
  }
  const contentList = message.map(message => message.content);

 res.json({ contentList})
})
// to edit message
const editMessage = catchAsync( async function (req,res) {
  
  const currentId= req.user._id.toString()
  const messageId = req.params.messageId;
  const groupId = req.params.groupId; // groupId
const {content} = req.body
  const group = await Group.findOne({_id: groupId})
  if(!group){
    throw new Error("Not found any group with given groupID")
  }

const messages = await Message.findOne({ _id: messageId, groupId: groupId });
if (!messages) {
  throw new Error("No message found with the given message ID in this group");
}
if(messages.senderId != currentId){
  throw new Error ( " Not allowed to modify message")
}
if(messages.content === content){
  throw new Error (" Content must be different to modify")
} 
 
  messages.content = content;
  await messages.save();

res.json("updated successfulyy")

})

const deleteMessage = catchAsync ( async function (req,res) {
  
  const currentId= req.user._id.toString()
  const messageId = req.params.messageId;
  const groupId = req.params.groupId; // groupId
const {content} = req.body
  const group = await Group.findOne({_id: groupId})
  if(!group){
    throw new Error("Not found any group with given groupID")
  }


const deletedMessage = await Message.findOneAndDelete({ _id: messageId, groupId: groupId });

if (!deletedMessage) {
  throw new Error("No message found with the given message ID in this group");
}

res.json({message: "deleted successfullyyy"})


})


const messageController = { sendMessage, viewMessage, editMessage, deleteMessage}
export default  messageController