import Joi from 'joi';


export default{
  
  group:
    {
      body: Joi.object().keys({

        content:Joi.string().min(3).required(),
       
      })
    }
 
}



