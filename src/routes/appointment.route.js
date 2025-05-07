import { Router } from "express";
import {
  createAppointment,
  getAllAppointmens,
} from "../controllers/appointment.controllers.js";
import { userAuth } from "../middlewares/jwt-auth.js";

const appointmentRouter = Router();

appointmentRouter.post("/book-appointment", userAuth, createAppointment);

appointmentRouter.get("/", getAllAppointmens);

<<<<<<< HEAD
import { userAuth, counsellorAuth } from '../middlewares/jwt-auth.js';


appointmentRouter.post('/book-appointment',userAuth,createAppointment);


appointmentRouter.get('/get-appointments',getAllAppointmens);



export { appointmentRouter };
=======
export { appointmentRouter };
>>>>>>> 36443e1d85a3ee5ed374014659cf188e9086febf
