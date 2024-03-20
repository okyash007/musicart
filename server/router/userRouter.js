import { Router } from "express";
import { auth, userLogin, userSignup } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const userRouter = Router();

userRouter.route("/login").post(userLogin);
userRouter.route("/signup").post(userSignup);
userRouter.route("/auth").get(verifyToken, auth);
