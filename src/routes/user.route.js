import { Router } from "express";
import { getAllUsers,getFilteredUsers } from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.get("/", getAllUsers);
UserRouter.get("/filteredUser",getFilteredUsers);

export { UserRouter };
