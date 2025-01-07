import { Router } from "express";
import { getMetaData, updateMetaData } from "../models/cryptoMetadata.js";
import { Currency } from "../models/currency.js"
import validate from "../middlewares/validate.js";
import { update } from "../validations/metadata.js"
import { currencyValidation } from "../validations/currency.js"
import mongoose from "mongoose";

const currencyRouter = Router();


// get main data
currencyRouter.get("/", async function (req, res) {
    try {
        const metadata = (await getMetaData()).toObject();
        const currencies = await Currency.find({})
        return res.json({ ...metadata, currencies: currencies.map((e) => ({ ...e.toObject(), __v: undefined })), _id: undefined, __v: undefined, date: new Date().toISOString() })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }

})

// edit metadata
currencyRouter.put("/", validate(update), async function (req, res) {
    try {
        const { updatedBy, source } = req.body;
        const latest = await updateMetaData({ updatedBy, source });
        return res.status(200).json({ metadata: latest })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
})

// add new currency
currencyRouter.post("/", validate(currencyValidation.addNew), async function (req, res) {
    try {
        const { name, exchangeRate, foundIn } = req.body;
        const latest = await Currency.create({ name, exchangeRate, foundIn });
        return res.status(201).json({ currency: latest })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
})

const singleCurrencyRouter = Router();

currencyRouter.use("/:currencyId",
    validate(currencyValidation.validateSingle),
    async function (req, res, next) {
        try {

            const { currencyId } = req.params;
            const existingCurrency = await Currency.findOne({ _id: new mongoose.Types.ObjectId(currencyId) });

            if (existingCurrency) {
                req.existingCurrency = existingCurrency;
                next();
            } else {
                throw new Error("Currency not found by id: " + currencyId)
            }
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    },
    singleCurrencyRouter);

singleCurrencyRouter.get("/", function (req, res) {
    return res.send({ currency: req.existingCurrency })
})

singleCurrencyRouter.put("/", validate(currencyValidation.addNew), async function (req, res) {
    try {
        const { name, exchangeRate, foundIn } = req.body;
        req.existingCurrency.name = name
        req.existingCurrency.exchangeRate = exchangeRate
        req.existingCurrency.foundIn = foundIn
        await req.existingCurrency.save();
        return res.status(200).json({ currency: req.existingCurrency })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
})

singleCurrencyRouter.delete("/", async function (req, res) {
    try {
        await req.existingCurrency.deleteOne();
        return res.status(200).json({ message: "Currency Deleted." })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
})






export default currencyRouter;