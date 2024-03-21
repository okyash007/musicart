import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import { apiError } from "../utils/apiError.js";
import Order from "../models/orderModel.js";

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
});
