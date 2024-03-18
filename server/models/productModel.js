import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    about: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true}],
    ratting: { type: mongoose.Types.Decimal128 , required: true}
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
