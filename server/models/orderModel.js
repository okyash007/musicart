import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    address: { type: String },
    payment: {
        type: String,
        enum: ["Pay On Delivery", "UPI", "Card"],
        required: true,
      },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
