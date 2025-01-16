import Joi from 'joi';


export default{
  
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



