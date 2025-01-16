import { catchAsync } from "../helper/catchAsync.js";
import Group from "../model/group.js";
import GroupMember from "../model/groupMember.js";
const createGroup = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).json({ error: "User not authenticated." });
      }
  
      const { name, description, isPrivate } = req.body;
      const userId = req.user._id;  
  s
      const newGroup = await Group.create({
        name,
        description,
        creatorID: userId,
        isPrivate,
        createdAt: new Date(),
      });
  
      return res.status(201).json({
        message: "Group created successfully.",
        group: newGroup,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "An error occurred while creating the group.",
      });
    }
  };
  
  export default { createGroup };
  