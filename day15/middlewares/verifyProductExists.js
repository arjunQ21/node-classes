import { catchAsync } from "../helpers/catchAsync.js";
import Product from "../models/product.js";

const verifyProductExists = catchAsync(async function (req, res, next) {
    const { productId } = req.params;
    const product = await Product.findOne({ _id: productId })
    if (!product) {
        throw new Error("Product not found by id: " + productId);
    }
    req.currentProduct = product;
    return next();
})

export default verifyProductExists