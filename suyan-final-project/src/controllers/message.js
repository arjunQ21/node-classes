import { catchAsync } from "../helpers/catchAsync.js";
import Group from "../models/group.js";
import groupMember from "../models/groupMember.js";
import Message from "../models/message.js";


//To send a message
const sendMessage = catchAsync (async function(req,res){
  
  
  const groupId = req.params.groupId;
  console.log(groupId);
  console.log("22")
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

  if (!checkMemberInGroup || checkMemberInGroup.length === 0) {
    throw new Error(
      "You are not allowed to send messages in this group. Only members can send messages."
    );
  }

  const { content} = req.body;

 const message = await Message.create({
  groupId: groupId,
  content: content,
  senderId: currentId
 })

  return res.json({message});
}  )



const messageController = { sendMessage}
export default  messageController