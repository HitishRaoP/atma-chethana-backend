import mongoose from "mongoose";
import { SERVER_CONSTANTS } from "../constants/server-constants";

export async function connectDB() {
  try {
    const response = await mongoose.connect(SERVER_CONSTANTS.MONGODB_URI);
    console.log("Connected to MongoDB:", response.connection.host);
  } catch (error) {
    throw new Error(error);
  }
}
