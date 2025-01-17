import Joi from "joi";

const validateAddGroupMember = Joi.object({
  userId: Joi.string().required().label("User ID")
  
});

const validateRemoveGroupMember = Joi.object({
  userId: Joi.string().required().label("User ID"),
  })


const validateFetchGroupMembers = Joi.object({
  groupId: Joi.string().required().label("Group ID").messages({
    "any.required": "Group ID is required.",
    "string.empty": "Group ID cannot be empty.",
  }),
});

const groupMemberValidator = {
  validateAddGroupMember,
  validateRemoveGroupMember,
  validateFetchGroupMembers,
};

export default groupMemberValidator;
