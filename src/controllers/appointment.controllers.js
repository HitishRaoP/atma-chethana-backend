import Appointment from '../models/appointment.model.js';

import { User } from '../models/user.model.js';



const createAppointment = async (req, res) => {
    try {
    
        const userId = req.user;

        const user = await User.findById(userId);

        if(!user){
            return res.json({success:false,message:`User Is not authorized. Login Again Please`});
        }

      const {
        name,
        usn,
        semester,
        department,
        reason
      } = req.body;
  
      
      if (!name || !usn || !semester || !department || !reason) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const appointment = await Appointment.create({
        userId,
        name,
        usn,
        semester,
        department,
        reason
      }); 


      res.status(201).json({
        message: "Appointment booked successfully",
        appointment: appointment
      });
    } catch (error) {
      console.error("Error booking appointment:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }



  const getAllAppointmens = async (req,res)=>{
    try{

        const appointments = await Appointment.find();

        return res.json({success:true,appointments});

    }catch(error){
        console.log("Error in Getting Appointments ",error);
        return res.status(500).json({success:false,message:`Error in Getting Appointments ${error}`});
    }
  }
  

  export { createAppointment, getAllAppointmens };