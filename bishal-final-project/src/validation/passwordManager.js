import Joi from "joi";

const validateForgotPassword = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};
const sendOTP = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};
const validateResetPassword = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(8).required(),
    newPassword: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

const resetPasswordValidation={
  validateForgotPassword,
  sendOTP,
  validateResetPassword
}
export default resetPasswordValidation;
