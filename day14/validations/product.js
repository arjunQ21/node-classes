import Joi from "joi";

export default {
    addNew: {
        body: Joi.object().keys({
            name: Joi.string().min(3).required(),
            cost: Joi.number().min(0).required(),
            stockQuantity:  Joi.number().min(0).required(),
        })
    },
}