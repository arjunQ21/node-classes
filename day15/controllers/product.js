import { catchAsync } from "../helpers/catchAsync.js";
import Product from "../models/product.js";



const addNew = catchAsync(async function (req, res) {

    const newProduct = await Product.create({ ...req.body, createdBy: req.user._id })

    return res.status(201).send({ product: newProduct })

});

const getAll = async function (req, res) {
    const products = await Product.find({}).sort({ createdAt: -1 }) 
    return res.send({products})
}

const getForUser = catchAsync(async function (req, res) {
    const userId = req.params.userId;
    const productsByThisUser = await Product.find({ createdBy: userId });
    return res.send({products: productsByThisUser})
})

const productController = { addNew, getAll, getForUser }

export default productController;