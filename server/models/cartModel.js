import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isCompleted: { type: Boolean, default: false },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
          max: 8,
          validate: {
            validator: function (value) {
              return value <= 8;
            },
            message: "Quantity cannot exceed 8.",
          },
        },
      },
    ],
  },
  { timestamps: true }
);

cartSchema.pre("save", function (next) {
  if (this.isModified("isCompleted") && this.isCompleted) {
    next(new Error("Cannot edit completed cart."));
  } else {
    next();
  }
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
