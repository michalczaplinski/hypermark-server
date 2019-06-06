import mongoose from "mongoose";
import { IUser } from "../types";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  role: {
    type: String,
    default: "user"
  }
});

export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);
