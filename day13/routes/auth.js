import { Router } from "express";

import validate from "../middlewares/validate.js"
import authValidation from "../validations/auth.js"
import {catchAsync} from "../helpers/catchAsync.js"
import User from "../models/user.js";
import {findUserByEmail} from "../services/user.js"
const authRouter = Router();

authRouter.post("/register", validate(authValidation.register), catchAsync(async function (req, res) {
    
    const { name, email, password, address, phone } = req.body;

    console.log({ name, email, password, address, phone })

    const existingUser = await findUserByEmail(req.body.email);

    if (existingUser) {
        throw new Error("Email already taken");
    }

    const newUser = (await User.create(req.body)).toObject();

    return res.send({ user: { ...newUser, password: undefined } })

}))

export default authRouter;

