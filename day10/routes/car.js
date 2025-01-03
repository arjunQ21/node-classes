import { Router } from "express";
import Car, { insertCar } from "../models/car.js"
import { addCarSchema } from "../validations/car.js";
const carRouter = Router();

// Get all Cars
carRouter.get("/", async function (req, res) {
    const carsInDatabase = await Car.find({})
    return res.json(carsInDatabase)
})

// add new car
carRouter.post("/", async function (req, res) {
    try {

        const validationResult = addCarSchema.validate(req.body, { abortEarly: false })
        if (validationResult.error) {

            throw new Error("Validation Error: "+ validationResult.error.message)
        }
        const newCar = await insertCar(validationResult.value)

        return res.status(201).json({car: newCar})
        
    } catch (e) {
        return res.status(400).json({error: e.message})
    }
    


})

export {carRouter}