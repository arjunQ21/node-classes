import User from "../models/user.js"

const findUserByEmail = async function (email) {
    const user = await User.findOne({ email });
    if (user) return user.toObject();
    else return null;
}

export { findUserByEmail }