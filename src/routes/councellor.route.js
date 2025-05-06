import { Router } from "express";
import { loginCounsellor } from "../controllers/councellor.controllers.js";

const CounsellorRouter = Router();

CounsellorRouter.post("/login", loginCounsellor);

export { CounsellorRouter };
