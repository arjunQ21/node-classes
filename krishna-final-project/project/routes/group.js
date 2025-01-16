import { Router } from "express";

import validate from "../middlewares/valdation.js";
import validationSchema from '../validations/group.js'
import GroupController from "../controllers/group.js";
import captureUserAuthToken from "../middlewares/captureUserauthToken.js";
const groupRouter=Router();



groupRouter.post('/',captureUserAuthToken,validate(validationSchema.addGroup),GroupController.CreateGroup);

groupRouter.get('/',captureUserAuthToken,GroupController.ViewAllPublicGroup);





export default groupRouter;