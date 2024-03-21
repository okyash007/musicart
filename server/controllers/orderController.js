import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import { apiError } from "../utils/apiError.js";
import Order from "../models/orderModel.js";
import { apiResponse } from "../utils/apiResponse.js";

const orderSchema = z.object({
  cart: z.string(),
  address: z.string(),
  payment: z.enum(["Pay On Delivery", "UPI", "Card"]),
});

export const placeOrder = asyncHandler(async (req, res, next) => {
  const isValid = orderSchema.safeParse(req.body);

  if (!isValid.success) {
    return next(new apiError(400, "Invalid Inputs"));
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new apiError(404, "User not found"));
  }

  const cart = await Cart.findOne({
    _id: isValid.data.cart,
    isCompleted: false,
  });

  if (!cart) {
    return next(new apiError(404, "Cart not found"));
  }

  if (cart.user.toString() !== user._id.toString()) {
    return next(new apiError(400, "Cart does not belong to user"));
  }
  const newOrder = new Order({
    cart: isValid.data.cart,
    address: isValid.data.address,
    payment: isValid.data.payment,
    user: user._id,
  });

  user.cart = undefined;
  await user.save();

  cart.isCompleted = true;
  await cart.save();

  await newOrder.save();

  return res.json(new apiResponse(200));
});

export const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).populate("user");
  return res.json(new apiResponse(200, orders));
});

export const getOrderById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findById(id).populate({
    path: "cart",
    populate: "items.product",
  });
  if (!order) {
    return next(new apiError(404, "Order not found"));
  }

  if (order.user.toString() !== req.user.id) {
    return next(new apiError(400, "Order does not belong to user"));
  }

  return res.json(new apiResponse(200, order));
});
