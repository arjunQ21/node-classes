import Joi from 'joi';

const messageValidator = Joi.object({
  groupId: Joi.string().required().regex(/^[a-f\d]{24}$/i).messages({
    'string.pattern.base': 'Invalid groupId format. Must be a valid ObjectId.',
  }),
  senderId: Joi.string().required().regex(/^[a-f\d]{24}$/i).messages({
    'string.pattern.base': 'Invalid senderId format. Must be a valid ObjectId.',
  }),
  content: Joi.string().trim().required().messages({
    'string.empty': 'Content cannot be empty.',
    'any.required': 'Content is required.',
  }),
  file: Joi.string().uri().optional().messages({
    'string.uri': 'File must be a valid URL.',
  }),
  timestamp: Joi.date().optional().messages({
    'date.base': 'Invalid timestamp format. Must be a valid date.',
  }),
  isDeleted: Joi.boolean().optional(),
});

export const validateMessage = (messageData) => {
  const { error, value } = messageValidator.validate(messageData, {
    abortEarly: false, 
    allowUnknown: true, 
  });

  if (error) {
    throw new Error(
      `Validation error: ${error.details.map((detail) => detail.message).join(', ')}`
    );
  }

  return value;
};
