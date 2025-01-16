
import { model, Schema } from "mongoose";

const userSchema = new Schema ({
  username:{
       type: String,
       required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  otp:{
    type:String,
  },
  otpExpiresAt:{
    type: Date
  }
}, { timestamps: true })


const User = model( "user", userSchema);

export default User;