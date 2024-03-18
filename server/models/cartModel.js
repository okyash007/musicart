import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isCompleted: { type: Boolean, default: false },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
          unique: true,
        },
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
        _id: false ,
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
