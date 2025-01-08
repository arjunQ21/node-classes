import { Router } from "express";

import validate from "../middlewares/validate.js"
import authValidation from "../validations/auth.js"
import {catchAsync} from "../helpers/catchAsync.js"
import User from "../models/user.js";
import {findUserByEmail} from "../services/user.js"
import authController from "../controllers/auth.js";
const authRouter = Router();

authRouter.post("/register", validate(authValidation.register), authController.register )

export default authRouter;

