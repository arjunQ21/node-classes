import { Router } from "express";
import requireLogin from "../middlewares/requireLogin.js"
import validate from "../middlewares/validate.js"
import productValidation from "../validations/product.js"
import productController from "../controllers/product.js";
const productRouter = Router();

// get all prodcuts
productRouter.get("/", productController.getAll)

// add new product
productRouter.post("/", requireLogin, validate(productValidation.addNew), productController.addNew)

// get products by specific user id
productRouter.get("/by/:userId", productController.getForUser);


export default productRouter;

