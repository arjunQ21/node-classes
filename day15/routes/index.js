import { Router } from "express";
import authRouter from "./auth.js";
import productRouter from "./product.js";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/products", productRouter)

export default routes;