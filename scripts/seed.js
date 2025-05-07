import "dotenv/config";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Appointment from "../src/models/appointment.model.js";
import { User } from "../src/models/user.model.js";

const generateRandomAppointment = (userId) => {
  return {
    userId,
    studentName: faker.person.firstName(),
    usn: faker.string.uuid(),
    semester: Math.floor(Math.random() * 8) + 1,
    department: faker.helpers.arrayElement([
      "Computer Science",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
    ]),
    reason: faker.helpers.arrayElement([
      "Exam Preparation",
      "Project Discussion",
      "Coursework",
      "Study Materials",
      "Consultation",
    ]),
    isDelayed: faker.datatype.boolean(),
    createdAt: faker.date.past(),
  };
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    const users = await User.find();
    if (users.length === 0) {
      console.log("No users found, please add users first.");
      return;
    }
    const appointments = [];
    for (let i = 0; i < 10; i++) {
      const userId = users[i % users.length]._id;
      const appointment = generateRandomAppointment(userId);
      appointments.push(appointment);
    }
    await Appointment.insertMany(appointments);
    console.log("Appointments seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seed();
