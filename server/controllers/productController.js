import { string, z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import Product from "../models/productModel.js";
import { apiResponse } from "../utils/apiResponse.js";

const productSchema = z.object({
  name: z.string(),
  brand: z.string(),
  about: z.string(),
  price: z.number().min(0),
  images: z.array(z.string()),
  ratting: z.number().max(5),
});

export const addProduct = asyncHandler((req, res, next) => {
  const isValid = productSchema.safeParse(req.body);

  if (!isValid.success) {
    return next(new apiError(400, "Invalid Inputs"));
  }

  const newProduct = new Product({
    name: isValid.data.name,
    brand: isValid.data.brand,
    about: isValid.data.about,
    ratting: isValid.data.ratting,
    price: isValid.data.price,
    images: isValid.data.images,
  });

  newProduct.save();

  return res.json(new apiResponse(200, newProduct));
});

export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  return res.json(new apiResponse(200, products));
});

export const getProductById = asyncHandler(async(req, res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return next(new apiError(404, "Product not found"));
    }
    return res.json(new apiResponse(200, product));
});
