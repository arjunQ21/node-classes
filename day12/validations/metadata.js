import Joi from "joi" 

const update = {

        body: Joi.object().keys({
            updatedBy: Joi.string().required(),
            source: Joi.string().required(),
        })

}
 
export {update}
