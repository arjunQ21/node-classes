import catchAsync from "../helpers/catchAsync.js";
import Group from "../models/group.js";
import GroupMember from "../models/groupMember.js";
import User from "../models/user.js";

const addGroupMember = catchAsync(async (req, res) => {
  const group_Id = req.params.groupId;

  console.log(group_Id);
  const existingGroup = await Group.findOne({ _id: group_Id });

  if (!existingGroup) {
    throw new Error("GroupID not found");
  }
  if (existingGroup.creatorID.toString() !== req.user._id.toString()) {
    throw new Error("Only creator can add the new User");
  }
  const existingUser = await User.findOne({ _id: req.body.userId });
  if (!existingUser) {
    throw new Error("User not found");
  }
  const existingGroupMember = await GroupMember.findOne({
    userId: req.body.userId,
    groupId: group_Id
  });

  if (existingGroupMember) {
    throw new Error("User already joined the Group");
  }
  const newGroupMember = (
    await GroupMember.create({
      userId: req.body.userId,
      groupId: req.params.groupId
    })
  ).toObject();

  return res.json({
    message: "User Registered Successfully",
    user: { ...newGroupMember }
  });
});

const RemoveGroupMember = catchAsync(async (req, res) => {
  const group_Id = req.params.groupId;

  const existingGroupMember = await GroupMember.findOne({
    userId: req.body.userId,
    groupId: group_Id
  });

  if (!existingGroupMember) {
    throw new Error("User didnot join the Group");
  }

  await existingGroupMember.deleteOne();

  return res.json({
    message: "User Removed Successfully from group"
  });
});

const JoinGroup = catchAsync(async (req, res) => {
  const group_Id = req.params.groupId;

  
  const existingGroup = await Group.findOne({ _id: group_Id });

  if (!existingGroup) {
    throw new Error("GroupID not found");
  }
  if (existingGroup.isPrivate===true) {
    throw new Error("User can only join the group which is public");
  }
  const existingUser = await User.findOne({ _id: req.body.userId });
  if (!existingUser) {
    throw new Error("User not found");
  }
  const existingGroupMember = await GroupMember.findOne({
    userId: req.body.userId,
    groupId: group_Id
  });

  if (existingGroupMember) {
    throw new Error("User already joined the Group");
  }

  const newGroupMember = (
    await GroupMember.create({
      userId: req.body.userId,
      groupId: req.params.groupId
    })
  ).toObject();

  return res.json({
    message: "User Registered Successfully",
    user: { ...newGroupMember }
  });
});

const groupMemberController = { addGroupMember, RemoveGroupMember,JoinGroup};

export default groupMemberController;
