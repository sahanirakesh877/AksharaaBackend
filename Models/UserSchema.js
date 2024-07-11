const mongoose = require("mongoose");
const validator = require("validator");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Enter your email"],
    unique: true,
    validate: [validator.isEmail, "enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
  },

  photo: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

const userSchema = mongoose.model("User", usersSchema);
module.exports = userSchema;
