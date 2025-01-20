import { Router } from "express";

import validate from "../middlewares/valdation.js";
import validationSchema from '../validations/group.js'
import GroupController from "../controllers/group.js";
import captureUserAuthToken from "../middlewares/captureUserauthToken.js";
import requireLogin from "../middlewares/requireLogin.js";
const groupRouter=Router();

//create group
groupRouter.post('/groups',captureUserAuthToken,requireLogin,validate(validationSchema.addGroup),GroupController.CreateGroup);

//view all public group
groupRouter.get('/groups',captureUserAuthToken,requireLogin,GroupController.ViewAllPublicGroup);

//view the group that user hs joined
groupRouter.get('groups/mine',captureUserAuthToken,requireLogin,GroupController.viewJoinedGroup);

//view specific group only if group is public or joined
groupRouter.get('groups/:groupId',captureUserAuthToken,requireLogin,GroupController.ViewGroup);

groupRouter.put('groups/:groupId',captureUserAuthToken,requireLogin,GroupController.EditGroup);


groupRouter.delete('groups/:groupId',captureUserAuthToken,requireLogin,GroupController.deleteGroup);






export default groupRouter;