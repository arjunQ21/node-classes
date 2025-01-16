import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    otp: {
      type: Number,
      default: null
    },
    isVerify: {
      type: Boolean,
      default: false
    },
    expiresAt: {
      type: Date,
      default: null // Expiration date for OTP
    },
    otpAttempts: { 
      type: Number, 
      default: 0 
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", UserSchema);

export default User;
