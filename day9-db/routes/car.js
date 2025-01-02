import { Router } from "express";
import Car from "../models/car.js"
const carRouter = Router();

// Get all Cars
carRouter.get("/", async function (req, res) {
    const carsInDatabase = await Car.find({})
    return res.json(carsInDatabase)
})

export {carRouter}