import { catchAsync } from "../helpers/catchAsync.js";

import Group from "../models/group.js";
import groupMember from "../models/groupMember.js";
import Message from "../models/message.js";

//To send a message
const sendMessage = catchAsync(async function (req, res) {
  const groupId = req.params.groupId; // groupId

  let group;
  try {
    group = await Group.findOne({ _id: groupId });
  } catch (e) {
    
  } finally {
    if (!group) {
      throw new Error("Not found any group with given groupID");
    }
  }

  const currentId = req.user._id.toString();
  if (!currentId) {
    throw new Error("User ID is missing. Are you authenticated?");
  }

  const checkMemberInGroup = await groupMember.find({
    groupId: groupId,
    userId: currentId,
  });
  const admin = group.creatorID;
  if (currentId != admin || !checkMemberInGroup) {
    throw new Error("You are not allowed to send messages in this group.");
  }

  const { content } = req.body; // actual messages

  const message = await Message.create({
    groupId: groupId,
    content: content,
    senderId: currentId,
  });

  return res.json({ message });
});

//to view message
const viewMessage = catchAsync(async function (req, res) {
  const groupId = req.params.groupId; // groupId

  const group = await Group.findOne({ _id: groupId });
  if (!group) {
    throw new Error("Not found any group with given groupID");
  }

  const currentId = req.user._id.toString();
  if (!currentId) {
    throw new Error("User ID is missing. Are you authenticated?");
  }

  // Check user is member or not
  const existingGroupMember = await groupMember.findOne({
    userId: req.user._id,
    groupId: groupId,
  });
  if (!existingGroupMember) {
    throw new Error("User did not join the group");
  }

  const message = await Message.find({ groupId: groupId });
  if (!message) {
    throw new Error("Message not found in this group");
  }
  // Gather all message IDs to be marked as seen
  const messageIds = message.map((message) => message._id);

  // Update the group member's `seenMessageID` array with all message IDs
  const setSeen = await groupMember.findOneAndUpdate(
    { userId: req.user._id, groupId: groupId }, // Ensure we're updating the correct group member
    { $addToSet: { seenMessageID: { $each: messageIds } } }, // Add all message IDs to the seenMessageID array (only if not already present)
    { new: true }
  );

  res.json({ message });
});
// to edit message
const editMessage = catchAsync(async function (req, res) {
  const currentId = req.user._id.toString();
  const messageId = req.params.messageId;
  const groupId = req.params.groupId; // groupId
  const { content } = req.body;
  const group = await Group.findOne({ _id: groupId });
  if (!group) {
    throw new Error("Not found any group with given groupID");
  }

  const messages = await Message.findOne({ _id: messageId, groupId: groupId });
  if (!messages) {
    throw new Error("No message found with the given message ID in this group");
  }
  if (messages.senderId != currentId) {
    throw new Error(" Not allowed to modify message");
  }
  if (messages.content === content) {
    throw new Error(" Content must be different to modify");
  }

  messages.content = content;
  await messages.save();

  res.json("updated successfulyy");
});
// to delete message
const deleteMessage = catchAsync(async function (req, res) {
  const currentId = req.user._id.toString();
  const messageId = req.params.messageId;
  const groupId = req.params.groupId; // groupId
  const { content } = req.body;
  const group = await Group.findOne({ _id: groupId });
  if (!group) {
    throw new Error("Not found any group with given groupID");
  }

  const deletedMessage = await Message.findOneAndDelete({
    _id: messageId,
    groupId: groupId,
  });

  if (!deletedMessage) {
    throw new Error("No message found with the given message ID in this group");
  }

  res.json({ message: "deleted successfullyyy" });
});
//setImage
const setImage = catchAsync(async function (req, res) {
  const groupId = req.params.groupId; // groupId

  const group = await Group.findOne({ _id: groupId });
  if (!group) {
    throw new Error("Not found any group with given groupID");
  }

  const currentId = req.user._id.toString();

  const existingGroupMember = await groupMember.find({
    userId: currentId,
    groupId: groupId,
  });

  if (!existingGroupMember) {
    throw new Error("Only the joined members can send message");
  }
  if (!req.file) {
    throw new Error("File upload failed.");
  }

  const { content } = req.body;

  const message = await Message.create({
    groupId: groupId,
    content: "file uploaded",
    senderId: currentId,
    file: req.file.path,
  });

  return res.json({ message });
});

const messageController = {
  sendMessage,
  viewMessage,
  editMessage,
  deleteMessage,
  setImage,
};
export default messageController;
