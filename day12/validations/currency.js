import Joi from "joi"

const currencyValidation = {
    addNew: {
        body: Joi.object().keys({
            name: Joi.string().required(),
            exchangeRate: Joi.number().required(),
            foundIn: Joi.date().required(),
        })
    },
    validateSingle: {

        params: Joi.object().keys({ currencyId: Joi.string().length(24).required(), })
    }
}


export { currencyValidation }