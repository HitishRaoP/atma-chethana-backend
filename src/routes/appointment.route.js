import { Router } from "express";

const appointmentRouter = Router();


import { createAppointment, getAllAppointmens } from '../controllers/appointment.controllers.js'

import { userAuth, counsellorAuth } from '../middlewares/jwt-auth.js';


appointmentRouter.post('/book-appointment',userAuth,createAppointment);


appointmentRouter.get('/get-appointments',getAllAppointmens);



export { appointmentRouter };