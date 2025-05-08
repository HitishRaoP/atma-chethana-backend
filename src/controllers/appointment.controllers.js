import Appointment from '../models/appointment.model.js';
import { User } from '../models/user.model.js';

const createAppointment = async (req, res) => {
    try {
        const {
            name,
            usn,
            semester,
            department,
            reason,
            date,
            time,
            status = 'scheduled'
        } = req.body;

        console.log('Received appointment request:', req.body);

        if (!name || !usn || !semester || !department || !reason) {
            console.log('Missing required fields:', { name, usn, semester, department, reason });
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                receivedData: { name, usn, semester, department, reason }
            });
        }

        // Find user by USN
        const user = await User.findOne({ usn });
        if (!user) {
            console.log('User not found for USN:', usn);
            return res.status(404).json({
                success: false,
                message: "User not found",
                usn: usn
            });
        }

        console.log('Found user:', user._id);

        const appointment = await Appointment.create({
            userId: user._id,
            studentName: name,
            usn,
            semester,
            department,
            reason,
            date,
            time,
            status
        });

        console.log('Created appointment:', appointment._id);

        // Ensure we're sending the exact format the frontend expects
        return res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment: {
                _id: appointment._id,
                studentName: appointment.studentName,
                usn: appointment.usn,
                semester: appointment.semester,
                department: appointment.department,
                reason: appointment.reason,
                date: appointment.date,
                time: appointment.time,
                status: appointment.status
            }
        });
    } catch (error) {
        console.error("Error booking appointment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getAllAppointmens = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        return res.json({ success: true, appointments });
    } catch (error) {
        console.log("Error in Getting Appointments ", error);
        return res.status(500).json({ success: false, message: `Error in Getting Appointments ${error}` });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;

        if (!['scheduled', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        // If appointment is completed, update user's session history
        if (status === 'completed') {
            const user = await User.findById(appointment.userId);
            if (user) {
                user.sessionHistory.push({
                    date: appointment.date,
                    reason: appointment.reason,
                    status: 'completed'
                });
                await user.save();
            }
        }

        return res.json({
            success: true,
            appointment
        });
    } catch (error) {
        console.error("Error updating appointment status:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating appointment status"
        });
    }
};

export { createAppointment, getAllAppointmens, updateAppointmentStatus };