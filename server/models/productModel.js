import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    about: { type: String, required: true },
    type: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    ratting: { type: Number, required: true },
    reviews: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
