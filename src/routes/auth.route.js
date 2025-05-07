import { Router } from "express";
import {
  signup,
  login,
  logout,
  checkAuthorisation,
} from "../controllers/auth.controllers.js";
import { userAuth, counsellorAuth } from "../middlewares/jwt-auth.js";
import { getUser, getAllUsers } from "../controllers/user.controller.js";

const AuthRouter = Router();

AuthRouter.post("/signup", signup);

AuthRouter.post("/login", login);

AuthRouter.get("/logout", logout);

AuthRouter.get("/check-auth", userAuth, checkAuthorisation);

AuthRouter.get("/getUser", userAuth, getUser);
AuthRouter.get("/getAllUser", counsellorAuth, getAllUsers);


export { AuthRouter };
