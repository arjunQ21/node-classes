import { model, Schema } from "mongoose";

const metaDataSchema = new Schema(
    {
        updatedBy: {
            type: String,
            default: ""
        },
        source: {
            type: String,
            default: ""
        }
    })

const CryptoMetadata = model("CryptoMetadata", metaDataSchema)

async function getMetaData () {
    // find that one metadata row

    let exitstingRow = await CryptoMetadata.findOne({})

    if (!exitstingRow) {
        exitstingRow = await CryptoMetadata.create({}) 
        console.log("New metadata instance created.");
    }
    return exitstingRow;
}

async function updateMetaData ({ updatedBy, source }) {
    const exitstingRow = await getMetaData()
    // update that row
    exitstingRow.updatedBy = updatedBy;
    exitstingRow.source = source;
    await exitstingRow.save();
    return exitstingRow;
}

export { updateMetaData, getMetaData, CryptoMetadata }


