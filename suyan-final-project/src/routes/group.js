import { Router } from "express";

import validate from "../middlewares/validate.js"
import authValidation from '../validation/user.js';
import authController from '../controllers/auth.js'

import captureUserFromAuthToken from "../middlewares/captureUserFromAuthToken.js";
import requireLogin from "../middlewares/requireLogin.js";



const groupRouter = Router();


groupRouter.post("/groups",captureUserFromAuthToken,requireLogin,validate(authValidation.group), authController.createGroup)

groupRouter.get("/groups",captureUserFromAuthToken,requireLogin, authController.viewAllGroup)

export default groupRouter