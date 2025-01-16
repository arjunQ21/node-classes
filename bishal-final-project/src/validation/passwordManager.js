import Joi from "joi";

export const validateForgotPassword = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

export const validateResetPassword = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(8).required(),
    newPassword: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};
