import { Router } from "express";
import {
  createAppointment,
  getAllAppointmens,
  updateAppointmentStatus,
} from "../controllers/appointment.controller.js";

const appointmentRouter = Router();

// Create new appointment - no auth required
appointmentRouter.post("/book-appointment", createAppointment);

// Get all appointments - no auth required
appointmentRouter.get("/", getAllAppointmens);

// Update appointment status - no auth required
appointmentRouter.patch("/:appointmentId/status", updateAppointmentStatus);

export { appointmentRouter };
