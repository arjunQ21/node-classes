import { Router } from "express";

import validate from "../middlewares/valdation.js";
import validationSchema from "../validations/groupMember.js";

import captureUserAuthToken from "../middlewares/captureUserauthToken.js";
import requireLogin from "../middlewares/requireLogin.js";
import groupMemberController from "../controllers/groupMember.js";
const groupMemberRouter = Router();

groupMemberRouter.post(
  "/groups/:groupId/members",
  captureUserAuthToken,
  requireLogin,
  validate(validationSchema.addGroupMember),
  groupMemberController.addGroupMember
);

groupMemberRouter.delete(
  "/groups/:groupId/members",
  captureUserAuthToken,
  requireLogin,
  validate(validationSchema.addGroupMember),
  groupMemberController.RemoveGroupMember
);

groupMemberRouter.post(
    "/groups/:groupId/join",
    captureUserAuthToken,
    requireLogin,
    validate(validationSchema.addGroupMember),
    groupMemberController.JoinGroup
  );

export default groupMemberRouter;
