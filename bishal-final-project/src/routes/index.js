import { Router } from "express";
import { authRouter, resetPasswordRouter } from "./authRoute.js";
import {groupRouter,singleGroupRouter} from "./groupRoute.js";
import groupMemberRouter from "./groupMemberRoute.js";

const routes = Router();

routes.use("/auth", authRouter);

routes.use("/password", resetPasswordRouter);

routes.use("/", groupRouter); 
routes.use("/groups", singleGroupRouter);

routes.use("/groups", groupMemberRouter);
export default routes;
