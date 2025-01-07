import Joi from 'joi'



const car = {
    name: "Suzuki",
    engineType: "diesel",
    price: 5600,
    isWorkingNicely: false,
    model: "XYZ",
    colors: [{
        "part": "wheel",
        "value": "black"
    }, {
        "part": "exterior",
        "value": "blue"
    },
    {
        "part": "seat",
        "value": "purple"
    }
    ],
    mileage: "32km",
    // ownerDetails: {
    //     name: "Hari Acharya",
    //     age: 34,
    //     email: "hari@gmail.com",
    //     phone: "+898 988-761234"
    // }
}

const isStringOfFixedSize = Joi.string().min(3).max(30).required();

const carSchema = Joi.object().keys({
    isWorkingNicely: Joi.boolean().required(),
    name: isStringOfFixedSize,
    price: Joi.number().min(0).required(),
    engineType: Joi.string().valid("diesel", 'petrol', 'electric').required(),
    model: isStringOfFixedSize,
    mileage: Joi.string().alphanum().required(),
    colors: Joi.array().items(Joi.object().keys({
        part: Joi.string().valid("wheel", 'exterior', 'seat', 'handle').required(),
        value: Joi.string().valid("white", 'black', 'blue', 'purple').required()
    })).required(),
    ownerDetails: Joi.object().keys({
        name: isStringOfFixedSize,
        age: Joi.number().min(0).max(150).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(new RegExp('^[0-9\+ -]{8,15}$'))
    }).required()
})

const validationResult = carSchema.validate(car, { abortEarly: false });



console.log(validationResult)



// console.log(Joi.number().required().validate("6s"))

// console.log(Joi.array().items(Joi.number()).validate([1, 2, 3, 4.5, '8']))

// console.log(Joi.array().items().keys(Joi.string()).validate(['ram', 'hari', 'shyam']))
