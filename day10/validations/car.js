import Joi from 'joi'

// { name, manufacturer, price, makeYear } 

const addCarSchema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    manufacturer: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
    makeYear: Joi.date().required(),
}

);

export {addCarSchema}
