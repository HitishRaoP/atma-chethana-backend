import { transporter } from "../config/nodemailer.js";
import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";

export const createAppointment = async (req, res) => {
	try {
		const {
			name,
			usn,
			semester,
			department,
			reason,
			date,
			time,
			status,
			emailData,
		} = req.body;

		// First find the user to get userId
		const user = await User.findOne({ usn });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Create new appointment
		const appointment = new Appointment({
			userId: user._id,
			studentName: name,
			usn,
			semester,
			department,
			reason,
			date,
			time,
			status,
		});

		await appointment.save();

		// Send confirmation email
		try {
			const mailOptions = {
				from: "Atma Chethana <khalandermohammed734@gmail.com>",
				to: user.email,
				subject: emailData.subject,
				html: emailData.message,
			};

			const response = await transporter.sendMail(mailOptions);
			console.log("Mail sent successfully:", response);

			res.status(201).json({
				success: true,
				message: "Appointment created and confirmation email sent successfully",
				appointment,
			});
		} catch (emailError) {
			console.error("Error sending email:", emailError);
			res.status(201).json({
				success: true,
				message: "Appointment created but email could not be sent",
				appointment,
			});
		}
	} catch (error) {
		console.error("Error creating appointment:", error);
		res.status(500).json({
			success: false,
			message: "Error creating appointment",
			error: error.message,
		});
	}
};

const getAllAppointmens = async (req, res) => {
	try {
		const appointments = await Appointment.find().sort({ createdAt: -1 });
		return res.json({ success: true, appointments });
	} catch (error) {
		console.log("Error in Getting Appointments ", error);
		return res.status(500).json({
			success: false,
			message: `Error in Getting Appointments ${error}`,
		});
	}
};

const updateAppointmentStatus = async (req, res) => {
	try {
		const { appointmentId } = req.params;
		const { status } = req.body;

		if (!["scheduled", "completed", "cancelled"].includes(status)) {
			return res.status(400).json({
				success: false,
				message: "Invalid status value",
			});
		}

		const appointment = await Appointment.findByIdAndUpdate(
			appointmentId,
			{ status },
			{ new: true },
		);

		if (!appointment) {
			return res.status(404).json({
				success: false,
				message: "Appointment not found",
			});
		}

		// If appointment is completed, update user's session history
		if (status === "completed") {
			const user = await User.findById(appointment.userId);
			if (user) {
				user.sessionHistory.push({
					date: appointment.date,
					reason: appointment.reason,
					status: "completed",
				});
				await user.save();
			}
		}

		return res.json({
			success: true,
			appointment,
		});
	} catch (error) {
		console.error("Error updating appointment status:", error);
		return res.status(500).json({
			success: false,
			message: "Error updating appointment status",
		});
	}
};

export { getAllAppointmens, updateAppointmentStatus };
