import { Router } from "express";

import validate from "../middlewares/validate.js"
import messageValidation from '../validation/message.js';
import captureUserFromAuthToken from "../middlewares/captureUserFromAuthToken.js";
import requireLogin from "../middlewares/requireLogin.js";
import messageController from "../controllers/message.js";



const messageRouter = Router();

// to send message
messageRouter.post("/groups/:groupId/messages",captureUserFromAuthToken,requireLogin,validate(messageValidation.message),  messageController.sendMessage)

//to view message
messageRouter.get("/groups/:groupId/messages",captureUserFromAuthToken,requireLogin,  messageController.viewMessage)

// to edit the message
messageRouter.put("/groups/:groupId/messages/:messageId",captureUserFromAuthToken,requireLogin,validate(messageValidation.message),  messageController.editMessage)


// to delete the message
messageRouter.delete("/groups/:groupId/messages/:messageId",captureUserFromAuthToken,requireLogin,messageController.deleteMessage)





export default messageRouter

