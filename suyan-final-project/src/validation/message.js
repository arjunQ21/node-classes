import Joi from 'joi';


export default{
  
  message:
    {
      body: Joi.object().keys({
        
        content:Joi.string().min(3).required()
       
      })
    }
 
}



