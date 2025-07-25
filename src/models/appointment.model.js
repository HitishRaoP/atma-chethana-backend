import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	studentName: { type: String, required: true },
	usn: { type: String, required: true },
	semester: { type: String, required: true },
	department: { type: String, required: true },
	reason: { type: String, required: true },
	date: { type: Date, required: true },
	time: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	isDelayed: { type: Boolean, default: false },
	status: {
		type: String,
		enum: ["pending", "scheduled", "completed", "cancelled"],
		default: "pending",
	},
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export { Appointment };
