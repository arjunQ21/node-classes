import jwt from "jsonwebtoken";
import User from "../models/user.js";


const findUserbyemail = async function (email) {
  
   const user = await User.findOne({ email });
   if (user) return user.toObject();
   else return null;
}

const createJWT = function(userId){
  return jwt.sign({sub: userId}, process.env.JWT_SECRET_KEY)
}

export {findUserbyemail,createJWT}