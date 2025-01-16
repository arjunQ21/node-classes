import { Router } from "express";
import authRouter from "./auth.js";
import groupRouter from "./group.js";
import groupMemberRouter from "./groupmember.js";

const mainRoutes=Router();


mainRoutes.use('/auth',authRouter)

mainRoutes.use('/groups',groupRouter)
mainRoutes.use('',groupMemberRouter)

export default mainRoutes