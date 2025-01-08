import { catchAsync } from "../helpers/catchAsync.js";
import User from "../models/user.js";
import { findUserByEmail } from "../services/user.js";



const register = catchAsync(async function (req, res) {

    const { name, email, password, address, phone } = req.body;

    console.log({ name, email, password, address, phone })

    const existingUser = await findUserByEmail(req.body.email);

    if (existingUser) {
        throw new Error("Email already taken");
    }

    const newUser = (await User.create(req.body)).toObject();

    return res.send({ user: { ...newUser, password: undefined } })

})

const authController = {register}

export default authController;