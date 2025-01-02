import { config } from 'dotenv'
import mongoose from 'mongoose'

import {insertCar} from "./models/car.js"

config();

mongoose.connect(process.env.MONGODB_URL).then(async () => {
    console.log("Connected to MongoDB.")
    var insertDetails = await insertCar({ name: "Roadster", price: 240000, makeYear: "2018", manufacturer: "Tesla" })
    console.log({insertDetails})
})
    .catch(function (err) {
        console.error("Error connecting to MongoDB", err)
    })

