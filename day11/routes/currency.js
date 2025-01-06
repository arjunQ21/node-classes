import { Router } from "express";
import { getMetaData, updateMetaData } from "../models/cryptoMetadata.js";
import { Currency } from "../models/currency.js"
import validate from "../middlewares/validate.js";
import {update} from "../validations/metadata.js"

const currencyRouter = Router();


// get main data
currencyRouter.get("/", async function (req, res) {
    try {
        const metadata = (await getMetaData()).toObject();
        const currencies = await Currency.find({})
        return res.json({ ...metadata, currencies: currencies })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }

})

// edit metadata
currencyRouter.put("/", validate( update ), async function (req, res) {
    try {
        const { updatedBy, source } = req.body;
        const latest = await updateMetaData({ updatedBy, source });
        return res.status(200).json({ metadata: latest })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
})




export default currencyRouter;