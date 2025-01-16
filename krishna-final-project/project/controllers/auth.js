import catchAsync from "../helpers/catchAsync.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { createJwt, findUserByEmail } from "../services/user.js";

import sendmail from "../services/sendmail.js";

const register = catchAsync(async (req, res) => {
  const existingUser = await findUserByEmail(req.body.email);

  if (existingUser) {
    throw new Error("Email already taken or used");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const result = await sendmail(req.body.email);

  const newUser = (
    await User.create({
      ...req.body,
      password: hashedPassword,
      otp: result.otp,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000)
    })
  ).toObject();

  return res.json({
    message: "User Registered Successfully",
    user: { ...newUser }
  });
});

const verifyEmail = catchAsync(async (req, res) => {
    // const {otp}=req.body.otp;
    const existingUser=await User.findOne({email:req.body.email});
  
    if(!existingUser){
        throw new Error ("Invalid Otp")
    }

   
    if (new Date() > existingUser.expiresAt) {
        throw new Error("OTP has expired.");
    }
    if (existingUser.otpAttempts >= 10) {
        throw new Error("You have exceeded the maximum number of attempts.");
      }
    if (req.body.otp !== existingUser.otp) {
        existingUser.otpAttempts += 1;
        await existingUser.save();
        throw new Error("OTP does not match");
     }


    existingUser.otp = undefined;  // Clear OTP after successful verification
    existingUser.expiresAt = undefined; 
    existingUser.isVerify=true;
    await existingUser.save();
    return res.json({
        message:"Verfied Email"
    })

  });

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await findUserByEmail(req.body.email);
  if (!existingUser) {
    throw new Error("Incorrect Email");
  }

if(existingUser.isVerify===false){
    throw new Error ("Email not verified")
}
  const hashedPassword = existingUser.password;

  const matched = await bcrypt.compare(password, hashedPassword);

  if (matched) {
    const token = createJwt(existingUser._id);
    return res.json({
      message: "Successfully User logged In",
      User: { ...existingUser, password: undefined, token }
    });
  } else {
    throw new Error("Invalid email and password");
  }
});

const forgetPassword = catchAsync(async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      throw new Error("Email not found");
    }
    console.log(1);

    const result = await sendmail(existingUser.email);
    console.log("Sendmail result:", result.otp);

    // Ensure result and OTP are valid
    if (!result) {
      console.error("Failed to generate OTP or send email");
      throw new Error("OTP could not be generated or email sending failed");
    }

    existingUser.otp = result.otp;
    console.log(existingUser.otp);
    existingUser.expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP expiration (15 minutes)

    // Save the updated user document
    await existingUser.save();

    return res.json({
      message: "OTP sent successfully to user"
    });
  } catch (error) {
    console.error("Error in recovery function:", error); // Log errors here too
    return res.status(500).json({ error: error.message });
  }
});

const resetPassword = catchAsync(async (req, res) => {
   
      const { email, otp, password } = req.body;
      
      // Find the user by email
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        throw new Error("Email not found");
      }
  
      console.log("Existing OTP:", existingUser.otp);
      console.log("User input OTP:", otp);
  
      // Check if OTP has expired
      if (new Date() > existingUser.otpExpires) {
        throw new Error("OTP has expired");
      }
  
      // Check if user has exceeded the maximum OTP attempts (limit of 10)
      if (existingUser.otpAttempts >= 10) {
        throw new Error("You have exceeded the maximum number of attempts.");
      }
  
 
  
      // Match the OTP
      if (String(otp) !== String(existingUser.otp)) {
        existingUser.otpAttempts += 1;
        await existingUser.save();
       
        throw new Error("OTP does not match");
      }
  
     
      existingUser.password = await bcrypt.hash(password, 10);
      
      // Clear OTP and OTP expiration after successful verification
      existingUser.otp = null;
      existingUser.otpExpires = null;
  
      // Save the updated user
      await existingUser.save();
  
      return res.json({
        message: "Successfully updated password"
      });
    
  });

const authController = { register, login, forgetPassword, resetPassword,verifyEmail};

export default authController;
