import { Router } from "express";

import validate from "../middlewares/validate.js"
import authValidation from '../validation/user.js';
import captureUserFromAuthToken from "../middlewares/captureUserFromAuthToken.js";
import requireLogin from "../middlewares/requireLogin.js";
import groupController from "../controllers/group.js";


const groupRouter = Router();

// to create a new group
groupRouter.post("/groups",captureUserFromAuthToken,requireLogin,validate(authValidation.group),  groupController.createGroup)

//to view all groups
groupRouter.get("/groups",captureUserFromAuthToken,requireLogin,  groupController.viewAllGroup)
 

//Add member to a private group
groupRouter.post("/groups/:groupID/members", captureUserFromAuthToken,requireLogin, validate(authValidation.addMember) ,groupController.addMember)

//View the groups in which a user has joined:
groupRouter.get("/groups/mine", captureUserFromAuthToken,requireLogin, validate(authValidation.member) ,groupController.viewGroups)

//Join public group
groupRouter.post("/groups/:groupID/join", captureUserFromAuthToken,requireLogin, validate(authValidation.Validgroup) ,groupController.joinPublicGroup)
export default groupRouter

