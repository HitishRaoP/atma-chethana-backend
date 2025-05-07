import { Router } from "express";
import {
  createAppointment,
  getAllAppointmens,
} from "../controllers/appointment.controllers.js";
import { userAuth } from "../middlewares/jwt-auth.js";

const appointmentRouter = Router();

appointmentRouter.post("/book-appointment", userAuth, createAppointment);

appointmentRouter.get("/", getAllAppointmens);

export { appointmentRouter };
