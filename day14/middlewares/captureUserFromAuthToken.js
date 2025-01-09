import jwt from "jsonwebtoken"
import User from "../models/user.js";

const captureUserFromAuthToken = async function (req, res, next) {
    try {
        const authToken = req.headers['authorization'];
        if (authToken) {
            const payload = jwt.verify(authToken, process.env.JWT_SECRET_KEY)

            if (!payload) throw new Error("Payload could not be read.");

            if (payload.sub) {
                const userId = payload.sub;
                const user = await User.findOne({ _id: userId });
                req.user = user;
                console.log("Login found of: " + user.name);
            } else {
                throw new Error("Subject not found in payload.");
            }
        } else {
            throw new Error("Auth token not found.");
        }
    } catch (e) {
        console.log("Auth Error: ", e.message)
    } finally {
        next();
    }
}

export default captureUserFromAuthToken;