import { Router } from "express";
import { authRouter, resetPasswordRouter } from "./authRoute.js";
import groupRouter from "./groupRoute.js"; // Import group router

const routes = Router();

routes.use("/auth", authRouter);

routes.use("/password", resetPasswordRouter);

routes.use("/", groupRouter); 

export default routes;
