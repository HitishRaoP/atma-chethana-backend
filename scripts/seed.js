import "dotenv/config";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Appointment from "../src/models/appointment.model.js";
import { User } from "../src/models/user.model.js";
import { SERVER_CONSTANTS } from "../src/constants/server-constants.js";

const generateRandomAppointment = (userId) => {
  return {
    userId,
    studentName: faker.person.firstName(),
    usn: faker.helpers.arrayElement([
      faker.random.arrayElement(["1BM", "1MC", "1ME", "1CS"]),
    ]), // Modify here to match the user format
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
    await mongoose.connect(SERVER_CONSTANTS.MONGODB_URI);
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

const seedUsers = async () => {
  try {
    await mongoose.connect(SERVER_CONSTANTS.MONGODB_URI);
    console.log("Connected to MongoDB");

    const users = [];
    const generateUSN = () => {
      const year = faker.helpers.arrayElement(["22", "23", "24"]);
      const departmentCode = faker.helpers.arrayElement([
        "CS",
        "IT",
        "EC",
        "EE",
      ]);
      const rollNo = faker.number
        .int({ min: 100, max: 999 })
        .toString()
        .padStart(3, "0");
      return `1BM${year}${departmentCode}${rollNo}`;
    };

    for (let i = 0; i < 10; i++) {
      const user = {
        fullName: faker.person.fullName(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        semester: faker.helpers.arrayElement([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
        ]),
        department: faker.helpers.arrayElement([
          "Computer Science",
          "Electrical",
          "Mechanical",
          "Civil",
        ]),
        phone: faker.phone.number(),
        usn: generateUSN(),
      };
      users.push(user);
    }

    await User.insertMany(users);
    console.log("Seed data inserted successfully");
  } catch (err) {
    console.error("Error inserting seed data:", err);
  } finally {
    mongoose.disconnect();
    console.log("MongoDB connection closed");
  }
};

seedUsers();
