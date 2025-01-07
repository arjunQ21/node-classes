import { model, Schema } from "mongoose";

const currencySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    exchangeRate: {
        type: Number,
        required: true,
    },
    foundIn: {
        type: Date,
        required: true,
    }

}, { timestamps: true })

const Currency = model("Currency", currencySchema);

export  {Currency}