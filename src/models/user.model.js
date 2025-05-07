import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
    },
    department: {
      type: String,
    },
    phoneNum: {
      type: String,
    },
    usn:{
      type:String,
    }
  },
  { timestamps: true }
);

export const User = mongoose.models.user || mongoose.model("user", userSchema);
