import { Router } from "express";
import {authRouter,resetPasswordRouter} from "./authRoute.js";


const routes = Router();

// Authentication routes
routes.use("/auth", authRouter);

// Password reset routes
routes.use("/password", resetPasswordRouter); // Add the reset password routes

export default routes;
