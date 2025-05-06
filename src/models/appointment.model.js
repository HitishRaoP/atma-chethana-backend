import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    usn: { type: String, required: true, },//unique: true 
    semester: { type: String, required: true },
    department: { type: String, required: true },
    reason: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// const appointmentDB = mongoose.connection.useDb("Appointment"); // uses the appointment DB

const Appointment = mongoose.model("Appointment", appointmentSchema);



export default Appointment;



