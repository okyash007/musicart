import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import Cart from "../models/cartModel.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import User from "../models/userModel.js";

const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1).max(8),
});

export const addProductToCart = asyncHandler(async (req, res, next) => {
  const isValid = cartItemSchema.safeParse(req.body);

  if (!isValid.success) {
    return next(new apiError(400, "Invalid Inputs"));
  }

  const { productId, quantity } = isValid.data;

  const userCart = await Cart.findOne({
    user: req.user.id,
    isCompleted: false,
  });

  if (!userCart) {
    // Create a new cart if it doesn't exist

    const newCart = new Cart({
      user: req.user.id,
      items: [{ product: productId, quantity }],
    });
    console.log(newCart);
    await newCart.save();

    const user = await User.findById(req.user.id);
    user.cart = newCart._id;

    await user.save();
  } else {
    // Add the item to the existing cart
    const existingItem = userCart.items.find(
      (item) => item.product.toString() === productId.toString()
    );

    if (existingItem) {
      // Increment the quantity of the existing item
      existingItem.quantity = quantity;
    } else {
      // Add the new item to the existing cart
      userCart.items.push({ product: productId, quantity });
    }

    await userCart.save();
  }

  const cart = await Cart.findOne({ user: req.user.id, isCompleted: false })
    .populate("items.product")
    .exec();

  return res.json(new apiResponse(200, cart));
});
