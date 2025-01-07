import { Router } from "express";
import Car, { insertCar } from "../models/car.js"
import { addCarSchema } from "../validations/car.js";
import mongoose from "mongoose";
const carRouter = Router();

// Get all Cars
carRouter.get("/",
    function (req, res, next) {

        // Showcase of how next() function works
        console.log("Running from pervious function");
        setTimeout(function () {
            next();
        }, 1000)

    },
    async function (req, res) {
        const carsInDatabase = await Car.find({})
        return res.json(carsInDatabase)
    })
// add new car
carRouter.post("/", async function (req, res) {
    try {
        const validationResult = addCarSchema.validate(req.body, { abortEarly: false })
        if (validationResult.error) {
            throw new Error("Validation Error: " + validationResult.error.message)
        }
        const newCar = await insertCar(validationResult.value)
        return res.status(201).json({ car: newCar })
    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
})

// single car
/**
 * 3 routes:
 * 1 -> Get single
 * 2 -> Edit single
 * 3 -> Delete Single
 * 
 * Same task of validating car's name/id should be performed for each of these 3 routes.
 * 
 */

const singleCarRouter = Router();

// clamping /:carId to singleCarRouter
// by using router.use function
carRouter.use("/:carId",
    async function (req, res, next) {
        try {
            const carId = req.params.carId;
            if (!carId) throw new Error("carId not found in req.params");
            // function to convert string id to ObjectID object: mongoose.Types.ObjectId
            const carInDB = await Car.findOne({ _id: new mongoose.Types.ObjectId(carId) })
            if (carInDB) {
                req.car = carInDB;
                next();
            } else {
                throw new Error("Car not found by id: " + carId)
            }
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    },
    singleCarRouter
)

// getting single car
singleCarRouter.get("/", function (req, res) {
    return res.send(req.car)
})

// deleting single car
singleCarRouter.delete("/", async function (req, res) {
    await req.car.deleteOne();
    return res.send({"message": "Car Deleted"})
})

// edit single car
singleCarRouter.put("/", async function (req, res) {

    try {
        const validationResult = addCarSchema.validate(req.body, { abortEarly: false })
        if (validationResult.error) {
            throw new Error("Validation Error: " + validationResult.error.message)
        }
        
        req.car.name = req.body.name
        req.car.manufacturer = req.body.manufacturer
        req.car.makeYear = req.body.makeYear
        req.car.price = req.body.price

        await req.car.save();

        return res.status(201).json({ car: req.car })
    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
    
})



export { carRouter }