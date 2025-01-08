import User from "../models/user.js"

const findUserByEmail = function (email) {
    return User.findOne({ email });
}

export {findUserByEmail}