import "dotenv/config";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";

const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/atma-chethana";

mongoose
	.connect(MONGODB_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Function to generate random session history
const generateSessionHistory = () => {
	const numSessions = faker.number.int({ min: 0, max: 5 }); // 0 to 5 sessions per user
	const sessions = [];

	for (let i = 0; i < numSessions; i++) {
		sessions.push({
			date: faker.date.recent({ days: 30 }),
			reason: faker.helpers.arrayElement([
				"Academic Performance",
				"Career Guidance",
				"Personal Issues",
				"Stress Management",
				"Time Management",
				"Study Skills",
			]),
			status: faker.helpers.arrayElement([
				"completed",
				"scheduled",
				"cancelled",
			]),
		});
	}

	return sessions;
};

// Function to generate random user data
const generateUserData = () => {
	const generateUSN = () => {
		const year = faker.helpers.arrayElement(["22", "23", "24"]);
		const departmentCode = faker.helpers.arrayElement([
			"CS",
			"IT",
			"EC",
			"EE",
			"ME",
			"CE",
			"BT",
			"AE",
			"IE",
			"IS",
			"ML",
		]);
		const rollNo = faker.number
			.int({ min: 1, max: 999 })
			.toString()
			.padStart(3, "0");
		return `1BM${year}${departmentCode}${rollNo}`;
	};

	const departments = [
		"Aerospace Engineering",
		"Artificial Intelligence and Data Science",
		"Bio-Technology",
		"Chemical Engineering",
		"Civil Engineering",
		"Computer Applications (MCA)",
		"Computer Science and Business Systems",
		"Computer Science and Engineering",
		"Computer Science and Engineering (DS)",
		"Computer Science and Engineering (IoT and CS)",
		"Electrical and Electronics Engineering",
		"Electronics and Communication Engineering",
		"Electronics and Instrumentation Engineering",
		"Electronics and Telecommunication Engineering",
		"Industrial Engineering and Management",
		"Information Science and Engineering",
		"Machine Learning (AI and ML)",
		"Management Studies and Research Centre",
		"Mechanical Engineering",
		"Medical Electronics Engineering",
		"Physics Department",
		"Chemistry Department",
		"Mathematics Department",
	];

	const semesters = [
		"1st Sem",
		"2nd Sem",
		"3rd Sem",
		"4th Sem",
		"5th Sem",
		"6th Sem",
		"7th Sem",
		"8th Sem",
	];

	return {
		fullName: faker.person.fullName(),
		username: faker.internet.username(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		semester: faker.helpers.arrayElement(semesters),
		department: faker.helpers.arrayElement(departments),
		phone: faker.phone.number(),
		usn: generateUSN(),
		soul_score: faker.number.int({ min: 0, max: 100 }),
		sessionHistory: generateSessionHistory(),
	};
};

const generateAppointmentData = (user) => {
	const appointmentDate = faker.date.future();
	// Randomly assign status for variety
	const possibleStatuses = ["pending", "scheduled", "completed", "cancelled"];
	const status = faker.helpers.arrayElement(possibleStatuses);
	return {
		userId: user._id,
		studentName: user.fullName,
		usn: user.usn,
		semester: user.semester,
		department: user.department,
		reason: faker.helpers.arrayElement([
			"Academic Performance",
			"Career Guidance",
			"Personal Issues",
			"Stress Management",
			"Time Management",
			"Study Skills",
		]),
		date: appointmentDate,
		time: appointmentDate.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		}),
		status: status,
		createdAt: faker.date.recent(),
	};
};

const createSpecificUser = async () => {
	const specificUserData = {
		fullName: "Hitish Rao",
		username: "hitishrao",
		email: "hitishrao.cs23@bmsce.ac.in",
		password: "password123",
		semester: "3rd Sem",
		department: "Computer Science and Engineering",
		phone: "9876543210",
		usn: "1BM23CS001",
		soul_score: 85,
		sessionHistory: generateSessionHistory(),
	};

	const user = await User.create(specificUserData);

	// Create at least one pending appointment for Hitish Rao
	await Appointment.create({
		userId: user._id,
		studentName: user.fullName,
		usn: user.usn,
		semester: user.semester,
		department: user.department,
		reason: "Academic Performance",
		date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
		time: "10:00 AM",
		status: "pending",
		createdAt: new Date(),
	});

	return user;
};

const seedDatabase = async () => {
	try {
		// Clear existing data
		await User.deleteMany({});
		await Appointment.deleteMany({});
		console.log("Cleared existing data");

		// Create specific user first
		const specificUser = await createSpecificUser();
		console.log("Created specific user");

		// Create other users
		const users = [specificUser]; // Start with the specific user
		for (let i = 0; i < 19; i++) {
			// Reduced to 19 to account for specific user
			const userData = generateUserData();
			const user = await User.create(userData);
			users.push(user);
		}
		console.log("Created all users");

		// Create appointments
		const appointments = [];
		for (let i = 0; i < 50; i++) {
			const randomUser = users[Math.floor(Math.random() * users.length)];
			const appointmentData = generateAppointmentData(randomUser);
			const appointment = await Appointment.create(appointmentData);
			appointments.push(appointment);
		}
		console.log("Created appointments");

		console.log("Database seeded successfully!");
		process.exit(0);
	} catch (error) {
		console.error("Error seeding database:", error);
		process.exit(1);
	}
};

seedDatabase();
