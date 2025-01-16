import { Router } from "express";

import validate from "../middlewares/valdation.js";
import validationSchema from '../validations/group.js'
import GroupController from "../controllers/group.js";
import captureUserAuthToken from "../middlewares/captureUserauthToken.js";
import requireLogin from "../middlewares/requireLogin.js";
const groupRouter=Router();


groupRouter.post('/',captureUserAuthToken,requireLogin,validate(validationSchema.addGroup),GroupController.CreateGroup);

groupRouter.get('/',captureUserAuthToken,requireLogin,GroupController.ViewAllPublicGroup);

groupRouter.get('/:groupId',captureUserAuthToken,requireLogin,GroupController.ViewGroup);

groupRouter.put('/:groupId',captureUserAuthToken,requireLogin,GroupController.EditGroup);







export default groupRouter;