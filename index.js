import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { SERVER_CONSTANTS } from "./src/constants/server-constants.js";
import { connectDB } from "./src/db/db.js";
import { appointmentRouter } from "./src/routes/appointment.route.js";
import { AuthRouter } from "./src/routes/auth.route.js";
import { CounsellorRouter } from "./src/routes/councellor.route.js";
import { UserRouter } from "./src/routes/user.route.js";

async function init() {
	const app = express();

	app.use(express.json());

	app.use(cookieParser());

	app.use(
		cors({
			origin: `${SERVER_CONSTANTS.FRONTEND_URL}`,
			methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
			credentials: true,
		}),
	);

	app.use(express.urlencoded({ extended: false }));

	connectDB();

	app.get("/", (req, res) => {
		res.json({
			message: "Server is Up and Running",
		});
	});

	app.use("/api/user", AuthRouter);

	app.use("/api/counsellor", CounsellorRouter);

	app.use("/api/appointment", appointmentRouter);

	app.use("/api/student", UserRouter);

	app.listen(SERVER_CONSTANTS.PORT, () => {
		console.log(
			`Server is Running on http://localhost:${SERVER_CONSTANTS.PORT}`,
		);
	});
}

init();
