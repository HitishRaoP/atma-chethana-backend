import { Router } from "express";
import {
	getAllUsers,
	getFilteredUsers,
	getUserByUSN,
} from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.get("/", getAllUsers);

UserRouter.get("/filteredUser", getFilteredUsers);

UserRouter.get("/byUSN", getUserByUSN);

export { UserRouter };
