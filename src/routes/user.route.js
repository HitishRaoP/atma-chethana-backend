import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.get("/", getAllUsers);

export { UserRouter };
