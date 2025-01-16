import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Group from "../models/group.js";


const findUserbyemail = async function (email) {
  
   const user = await User.findOne({ email });
   if (user) return user.toObject();
   else return null;
}

const findGroupByName = async function (name) {
  const groupName = await Group.findOne({name});

  if(groupName) return groupName.toObject();
  else return null;
}


const createJWT = function(userId){
  return jwt.sign({sub: userId}, process.env.JWT_SECRET_KEY)
}

export {findUserbyemail,findGroupByName,createJWT}