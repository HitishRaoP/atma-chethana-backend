import { Router } from "express";
import { createCounsellor, loginCounsellor, getAllCounsellors } from "../controllers/councellor.controllers.js";

const CounsellorRouter = Router();


CounsellorRouter.post('/signup',createCounsellor);
CounsellorRouter.post("/login", loginCounsellor);
CounsellorRouter.get('/',getAllCounsellors);


export { CounsellorRouter };
