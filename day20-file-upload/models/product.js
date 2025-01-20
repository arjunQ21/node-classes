import  { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true, },

    cost: {
        type: Number,
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, { timestamps: true })

const Product = model("Product", productSchema);

export default Product
