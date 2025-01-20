import { Router } from "express";

import validate from "../middlewares/validate.js"
import authValidation from '../validation/user.js';
import captureUserFromAuthToken from "../middlewares/captureUserFromAuthToken.js";
import requireLogin from "../middlewares/requireLogin.js";
import messageController from "../controllers/message.js";



const messageRouter = Router();

// to create a new group
messageRouter.post("/groups/:groupId/messages",captureUserFromAuthToken,requireLogin,validate(authValidation.message),  messageController.sendMessage)




export default messageRouter

