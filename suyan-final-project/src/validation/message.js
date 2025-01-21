import Joi from 'joi';


export default{
  
  message:
    {
      body: Joi.object().keys({

        content:Joi.string().min(3).required()
       
      })
    },

    
  group:
  {
    params: Joi.object().keys({

      groupId:Joi.string().min(16).required()
    })
  }

 
}



