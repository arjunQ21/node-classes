import { Router } from "express";
import authRouter from "./auth.js";

const routes = Router();

routes.use("/auth", function (req, res, next) { 
    console.log(req.body)
    next();
}, authRouter);

export default routes;