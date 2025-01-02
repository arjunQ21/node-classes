import { config } from 'dotenv'
import mongoose from 'mongoose'

config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to MongoDB.")
})
    .catch(function (err) {
        console.error("Error connecting to MongoDB")
    })

