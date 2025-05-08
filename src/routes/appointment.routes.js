import express from "express";
import {
	createAppointment,
	getAllAppointmens,
	updateAppointmentStatus,
} from "../controllers/appointment.controllers.js";

const router = express.Router();

router.post("/create", createAppointment);
router.get("/all", getAllAppointmens);
router.patch("/:appointmentId/status", updateAppointmentStatus);

export default router;
