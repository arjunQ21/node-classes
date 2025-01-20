import { Router } from "express";
import requireLogin from "../middlewares/requireLogin.js"
import validate from "../middlewares/validate.js"
import verifyProductExists from "../middlewares/verifyProductExists.js"
import productValidation from "../validations/product.js"
import productController from "../controllers/product.js";
import multer from "multer";

// const upload = multer({dest: "images/products"})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/products')
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1];
        const newFileName = `${req.currentProduct._id}.${extension}`
        cb(null, newFileName)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const fileType = file.mimetype.split("/")[0];
        if (fileType == 'image') {
            cb(null, true);
        } else {
            cb(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 3 // 1 MB
    }
})

const productRouter = Router();

// get all prodcuts
productRouter.get("/", productController.getAll)

// add new product
productRouter.post("/", requireLogin, validate(productValidation.addNew), productController.addNew)

// get products by specific user id
productRouter.get("/by/:userId", productController.getForUser);

const singleProductRouter = Router();

productRouter.use("/:productId", verifyProductExists, singleProductRouter)

// get single product
singleProductRouter.get("/", productController.getSingle)

// set image for a product
singleProductRouter.post("/setImage", upload.single('productImage'), productController.uploadImage)

// edit single product
singleProductRouter.put("/", validate(productValidation.addNew), requireLogin, productController.updateSingle)
// delete single product
singleProductRouter.delete("/", requireLogin, productController.deleteSingle)


export default productRouter;

