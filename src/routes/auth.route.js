import { Router } from "express";
import {
	checkAuthorisation,
	login,
	logout,
	signup,
} from "../controllers/auth.controllers.js";
import { getAllUsers, getUser } from "../controllers/user.controller.js";
import { counsellorAuth, userAuth } from "../middlewares/jwt-auth.js";

const AuthRouter = Router();

AuthRouter.post("/signup", signup);

AuthRouter.post("/login", login);

AuthRouter.get("/logout", logout);

AuthRouter.get("/check-auth", userAuth, checkAuthorisation);

AuthRouter.get("/getUser", userAuth, getUser);
AuthRouter.get("/getAllUser", counsellorAuth, getAllUsers);

export { AuthRouter };
