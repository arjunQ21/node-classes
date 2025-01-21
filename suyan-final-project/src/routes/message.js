import { Router } from "express";

import validate from "../middlewares/validate.js"
import messageValidation from '../validation/message.js';
import captureUserFromAuthToken from "../middlewares/captureUserFromAuthToken.js";
import requireLogin from "../middlewares/requireLogin.js";
import messageController from "../controllers/message.js";
import multer from "multer";

const messageRouter = Router();

// to send message
messageRouter.post("/groups/:groupId/messages",captureUserFromAuthToken,requireLogin,validate(messageValidation.message),  messageController.sendMessage)

//to view message
messageRouter.get("/groups/:groupId/messages",captureUserFromAuthToken,requireLogin,validate(messageValidation.group) , messageController.viewMessage)

// to edit the message
messageRouter.put("/groups/:groupId/messages/:messageId",captureUserFromAuthToken,requireLogin,validate(messageValidation.message),  messageController.editMessage)


// to delete the message
messageRouter.delete("/groups/:groupId/messages/:messageId",captureUserFromAuthToken,requireLogin,messageController.deleteMessage)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'message/file')
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1];
      
        const newFileName = `${req.user._id}.${extension}`
        cb(null, newFileName)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const fileType = file.mimetype.split("/")[0];
        if (fileType == 'image' || fileType=="application") {
            cb(null, true);
        } else {
            cb(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 20
    }
})


// set image 
messageRouter.post("/groups/:groupId/messages/setImage", captureUserFromAuthToken,requireLogin, upload.single('file'), messageController.setImage)




export default messageRouter

