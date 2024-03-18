import { Router } from "express";
import { addProductToCart } from "../controllers/cartController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const cartRouter = Router();

cartRouter.route("/add").post(verifyToken, addProductToCart);
