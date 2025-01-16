import { catchAsync } from "../helpers/catchAsync.js";
import { createJWT, findUserbyemail } from "../services/user.js";
import User from '../models/user.js';
import bcrypt from 'bcrypt'
import { sendRecoveryEmail } from "./forgot-pw.js";
import Group from "../models/group.js";

const register = catchAsync( async  function (req,res) {

const {  email, password} = req.body

  const exisitingUser = await findUserbyemail(email);
  if(exisitingUser){
    throw new Error (`User already exists with this email`)
  }
  //to ask ========== how to check username duplication
 const hashedPassword = await bcrypt.hash(req.body.password, 10);
 const newUser = await User.create({...req.body, password: hashedPassword})

 return res.send({ New_User: { ...newUser, password: undefined } })

})

const login = catchAsync(async function (req, res) {

  const { email, password } = req.body;
  const existingUser = await findUserbyemail(email);

  if (!existingUser) {
      throw new Error("User not found.");
  }

  const hasedPassword = existingUser.password;

  const matched = await bcrypt.compare(password, hasedPassword)

  if (matched) {
      const token = createJWT(existingUser._id);
      return res.send({ user: { ...existingUser, password: undefined, token } })
  } else throw new Error("Email or password invalid.")

})

  const forgotPassword = catchAsync(async function (req,res) {

  const {email} = req.body;
  const existingUser = await findUserbyemail(email)

  if (!existingUser) {
    throw new Error("User not found.");
  }

    // Call the function to send the recovery email
    const {token,emailInfo} = await sendRecoveryEmail(email);

     // Hash the OTP and save it to the database with expiration
     const hashedToken = await bcrypt.hash(token,10);
     
     const expiryOTP = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes
    

     // Update 
     await User.findOneAndUpdate(
      { email },
      {
          otp: hashedToken, // Save the hashed OTP
          otpExpiresAt: expiryOTP
      }
  );

    // Respond to the client once the email is sent successfully
    return res.status(200).json({
        message: "Recovery email sent successfully.",
        emailInfo,
    });  
  })

  const newPassword = catchAsync( async function (req,res) {

    const { email, otp , NewPassword} = req.body;

    const existingUser = await findUserbyemail(email);
    if(!existingUser){
      throw new Error ("User not found with this email" );
    }

    if (!existingUser.otp || !existingUser.otpExpiresAt) {
      throw new Error("OTP not found. Please request a new OTP.");
   }

   if (new Date() > existingUser.otpExpiresAt) {
    throw new Error("OTP has expired. Please request a new OTP.");
    }

    const otpValid = await bcrypt.compare(otp,existingUser.otp);
    if(!otpValid){
      throw new Error("OTP isnot valid")
    }
  
    //Hashing new password
    const newHashedPassword= await bcrypt.hash(NewPassword,10);
    await User.findOneAndUpdate(
      { email },
      {
          otp: null, 
          otpExpiresAt: null,
          password: newHashedPassword
      }
  );
    return res.json("Updated New Password !!!")
  })

  const createGroup = catchAsync (async function(req,res){

    

      const { name, description , isPrivate} = req.body;
      const group = await Group.create(
        { ...req.body, creatorID: req.user._id }
      )

      return res.json({group});


  }  )

const authController = { register,login , forgotPassword, newPassword, createGroup}
export default authController