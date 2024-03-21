import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getOrderById,
  getOrders,
  placeOrder,
} from "../controllers/orderController.js";

export const orderRouter = Router();

orderRouter.route("/").post(verifyToken, placeOrder);
orderRouter.route("/").get(verifyToken, getOrders);
orderRouter.route("/:id").get(verifyToken, getOrderById);
