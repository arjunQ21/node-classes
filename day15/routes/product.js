import { Router } from "express";
import requireLogin from "../middlewares/requireLogin.js"
import validate from "../middlewares/validate.js"
import verifyProductExists from "../middlewares/verifyProductExists.js"
import productValidation from "../validations/product.js"
import productController from "../controllers/product.js";
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

// edit single product
singleProductRouter.put("/", validate(productValidation.addNew), requireLogin, productController.updateSingle )
// delete single product
singleProductRouter.delete("/", requireLogin, productController.deleteSingle )


export default productRouter;

