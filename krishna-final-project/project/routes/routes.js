import { Router } from "express";
import authRouter from "./auth.js";
import groupRouter from "./group.js";

const mainRoutes=Router();


mainRoutes.use('/auth',authRouter)

mainRoutes.use('/groups',groupRouter)

export default mainRoutes