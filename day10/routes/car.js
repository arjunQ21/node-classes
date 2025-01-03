import { Router } from "express";
import Car, { insertCar } from "../models/car.js"
const carRouter = Router();

// Get all Cars
carRouter.get("/", async function (req, res) {
    const carsInDatabase = await Car.find({})
    return res.json(carsInDatabase)
})

// add new car
carRouter.post("/", async function (req, res) {
    try {
        const { name, manufacturer, price, makeYear } = req.body;
        if (!name || name.length < 5) {
            throw new Error("Name should have at least 5 characters.");
        }
        if (!manufacturer || manufacturer.length < 3) {
            throw new Error("Manufacturer should have at least 3 characters.");
        }
        if (!price || parseInt(price) === NaN) {
            throw new Error("Price should be a valid number.");
        }
        if (!makeYear ) {
            throw new Error("Makeyear should not be empty.");
        }

        const newCar = await insertCar({ name, manufacturer, price, makeYear })

        return res.status(201).json({car: newCar})
        
    } catch (e) {
        return res.status(400).json({error: e.message})
    }
    


})

export {carRouter}