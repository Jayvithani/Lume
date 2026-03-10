const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
   role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER"
  },
  otp:String,
  otpExpire:Date

});


const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
