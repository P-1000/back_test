import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 8,
    match: /^[0-9]{8}$/, // Enforces 8-digit numbers
  },
  section : {
    type : String,
  },
  Name :{
    type : String
  },
  Programme : {
    type : String
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "admin", "editor"],
    default: "student",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
