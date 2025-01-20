import { Router } from "express";

import validate from "../middlewares/valdation.js";
import validationSchema from "../validations/message.js";

import captureUserAuthToken from "../middlewares/captureUserauthToken.js";
import requireLogin from "../middlewares/requireLogin.js";
import messageController from "../controllers/message.js";
import multer from "multer";


const messageRouter = Router();

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
        fileSize: 1024 * 1024 * 2 
    }
})

messageRouter.post(
    "/groups/:groupId/messages",
    captureUserAuthToken,
    requireLogin,
    // validate(validationSchema.sendMessage),
    upload.single('file'),
    messageController.sendMessage
  );

  messageRouter.get(
    "/groups/:groupId/messages",
    captureUserAuthToken,
    requireLogin,
     messageController.getMessage
  )
  
 
  messageRouter.put(
    "/groups/:groupId/messages/:messageId",
    captureUserAuthToken,
    requireLogin,
    // validate(validationSchema.sendMessage),
    upload.single('file'),
     messageController.editMessage
  )
  
  messageRouter.delete(
    "/groups/:groupId/messages/:messageId",
    captureUserAuthToken,
    requireLogin,
    messageController.deleteMessage
  )

  messageRouter.get(
    "/groups/:groupId/messages/:messageId",
    captureUserAuthToken,
    requireLogin,
    messageController.getSingleMessage
  )

export default messageRouter;
