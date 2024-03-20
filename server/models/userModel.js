import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
      match: /^[6-9]{1}[0-9]{9}$/,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
