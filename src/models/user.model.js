import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
	date: {
		type: Date,
		required: true,
	},
	reason: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ["completed", "scheduled", "cancelled"],
		default: "scheduled",
	},
});

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		username: {
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
		phone: {
			type: String,
		},
		usn: {
			type: String,
		},
		soul_score: {
			type: Number,
			default: 75,
			min: 0,
			max: 100,
		},
		sessionHistory: [sessionSchema],
	},
	{ timestamps: true },
);

export const User = mongoose.models.user || mongoose.model("user", userSchema);
