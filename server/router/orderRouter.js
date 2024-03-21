import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { placeOrder } from "../controllers/orderController.js";

export const orderRouter = Router();

orderRouter.route("/").post(verifyToken, placeOrder);
// orderRouter.route("/").post(verifyToken, addProductToCart);