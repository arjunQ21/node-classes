import { Router } from "express";
import authRouter from "./auth.js";
import groupRouter from "./group.js";
import groupMemberRouter from "./groupmember.js";
import messageRouter from "./message.js";

const mainRoutes=Router();


mainRoutes.use('/auth',authRouter)

mainRoutes.use('',groupRouter)
mainRoutes.use('',groupMemberRouter)
mainRoutes.use('',messageRouter)

export default mainRoutes