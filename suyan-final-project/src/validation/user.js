import Joi from 'joi';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default{
  
  register:
    {
      body: Joi.object().keys({
        username: Joi.string().min(3).required(),
        email:  Joi.string().pattern(emailPattern).required(),
        password: Joi.string().min(8).required()
      })
    },

  login:
      {
        body: Joi.object().keys({
        email: Joi.string().pattern(emailPattern).required(),
        password: Joi.string().min(8).required()
      })
      },

  forgotPassword:{
    body: Joi.object().keys({
        email: Joi.string().pattern(emailPattern).required()
      })
      },

   newPassword:
      {
        body: Joi.object().keys({
        email: Joi.string().pattern(emailPattern).required(),
        otp: Joi.string().required(),
        NewPassword: Joi.string().min(8).required()
      })
      },

       group:
          {
            body: Joi.object().keys({
      
              name:Joi.string().min(3).required(),
              description:Joi.string().min(3).required(),
              isPrivate: Joi.boolean().required()
             
            })
          },

          
       addMember:
          {
            body: Joi.object().keys({
      
              memberId: Joi.string().min(3).required(),
            })
          }
}



