import "dotenv/config";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Appointment from "../src/models/appointment.model.js";
import { User } from "../src/models/user.model.js";
import { SERVER_CONSTANTS } from "../src/constants/server-constants.js";

const generateRandomAppointment = (userId) => {
  return {
    userId,
    studentName: faker.person.fullName(),
    usn: faker.helpers.arrayElement([
      faker.helpers.arrayElement(["1BM22CS", "1BM22IT", "1BM22EC", "1BM22EE"]),
    ]) + faker.number.int({ min: 100, max: 999 }).toString().padStart(3, "0"),
    semester: faker.helpers.arrayElement(["1st Sem", "2nd Sem", "3rd Sem", "4th Sem", "5th Sem", "6th Sem", "7th Sem", "8th Sem"]),
    department: faker.helpers.arrayElement([
      "Computer Science and Engineering",
      "Information Science and Engineering",
      "Electronics and Communication Engineering",
      "Electrical and Electronics Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
    ]),
    reason: faker.helpers.arrayElement([
      "Academic Performance",
      "Career Guidance",
      "Personal Issues",
      "Stress Management",
      "Time Management",
      "Study Skills",
    ]),
    status: faker.helpers.arrayElement(['scheduled', 'completed', 'cancelled']),
    createdAt: faker.date.past(),
  };
};

const generateRandomSession = () => {
  return {
    date: faker.date.past(),
    reason: faker.helpers.arrayElement([
      "Academic Performance",
      "Career Guidance",
      "Personal Issues",
      "Stress Management",
      "Time Management",
      "Study Skills",
    ]),
    status: faker.helpers.arrayElement(['completed', 'scheduled', 'cancelled'])
  };
};

const seed = async () => {
  try {
    await mongoose.connect(SERVER_CONSTANTS.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Appointment.deleteMany({});
    console.log("Cleared existing data");

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

    // Generate users with session history
    for (let i = 0; i < 10; i++) {
      const user = {
        fullName: faker.person.fullName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        semester: faker.helpers.arrayElement([
          "1st Sem",
          "2nd Sem",
          "3rd Sem",
          "4th Sem",
          "5th Sem",
          "6th Sem",
          "7th Sem",
          "8th Sem",
        ]),
        department: faker.helpers.arrayElement([
          "Computer Science and Engineering",
          "Information Science and Engineering",
          "Electronics and Communication Engineering",
          "Electrical and Electronics Engineering",
          "Mechanical Engineering",
          "Civil Engineering",
        ]),
        phone: faker.phone.number(),
        usn: generateUSN(),
        soul_score: faker.number.int({ min: 0, max: 100 }),
        sessionHistory: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, generateRandomSession)
      };
      users.push(user);
    }

    const createdUsers = await User.insertMany(users);
    console.log("Users seeded successfully");

    // Generate appointments
    const appointments = [];
    for (let i = 0; i < 20; i++) {
      const userId = createdUsers[i % createdUsers.length]._id;
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
