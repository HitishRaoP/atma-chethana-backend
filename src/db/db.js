import mongoose from "mongoose";
import { SERVER_CONSTANTS } from "../constants/server-constants.js";

async function connectDB() {
	try {
		const response = await mongoose.connect(SERVER_CONSTANTS.MONGODB_URI);
		console.log("Connected to MongoDB:", response.connection.host);
	} catch (error) {
		console.log("Error in DataBase Connection");
		throw new Error(error);
	}
}

export { connectDB };
