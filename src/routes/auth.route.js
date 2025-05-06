import { Router } from "express";
import {
  signup,
  login,
  logout,
  checkAuthorisation,
} from "../controllers/auth.controllers.js";
import { userAuth } from "../middlewares/jwt-auth.js";
import { getUser } from "../controllers/user.controller.js";

const AuthRouter = Router();

AuthRouter.post("/signup", signup);

AuthRouter.post("/login", login);

AuthRouter.get("/logout", logout);

AuthRouter.get("/check-auth", userAuth, checkAuthorisation);

AuthRouter.get("/getUser", userAuth, getUser);

export { AuthRouter };
