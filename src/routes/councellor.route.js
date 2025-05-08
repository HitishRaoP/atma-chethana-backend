import { Router } from "express";
import {
	createCounsellor,
	getAllCounsellors,
	loginCounsellor,
	sendEmail,
} from "../controllers/councellor.controllers.js";

const CounsellorRouter = Router();

CounsellorRouter.post("/signup", createCounsellor);
CounsellorRouter.post("/login", loginCounsellor);
CounsellorRouter.post("/sendMail", sendEmail);

CounsellorRouter.get("/", getAllCounsellors);

export { CounsellorRouter };
