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

const getSingle = function (req, res) {
    return res.send({product: req.currentProduct.toObject()})
}

const updateSingle = catchAsync(async function (req, res) {
    // verify if the person updating a product is its creator
    const creatorId = req.currentProduct.createdBy.toString();
    const currentRequesterId = req.user._id.toString();
    if (creatorId != currentRequesterId) throw new Error("You are not authorized to update this product.");

    // try updating
    req.currentProduct.name = req.body.name;
    req.currentProduct.cost = req.body.cost;
    req.currentProduct.stockQuantity = req.body.stockQuantity;

    await req.currentProduct.save();

    return res.send({product: req.currentProduct})

})

const deleteSingle = catchAsync(async function (req, res) {
    // verify if the person deleting a product is its creator
    const creatorId = req.currentProduct.createdBy.toString();
    const currentRequesterId = req.user._id.toString();
    if (creatorId != currentRequesterId) throw new Error("You are not authorized to delete this product.");

    await req.currentProduct.deleteOne();

    res.setHeader("x-Content-Deleted", 'true');

    return res.send({message: "Product deleted."})

})

const uploadImage = catchAsync(async function (req, res) {
    return res.send({
        file: req.file,
        body: req.body
    })
})

const productController = { addNew, getAll, getForUser, getSingle, updateSingle, deleteSingle, uploadImage }

export default productController;