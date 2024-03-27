import { string, z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import Product from "../models/productModel.js";
import { apiResponse } from "../utils/apiResponse.js";

const productSchema = z.object({
  name: z.string(),
  brand: z.string(),
  about: z.string(),
  type: z.string(),
  color: z.string(),
  price: z.number().min(0),
  images: z.array(z.string()),
  ratting: z.number().max(50),
  reviews: z.number(),
});

export const addProduct = asyncHandler((req, res, next) => {
  const isValid = productSchema.safeParse(req.body);

  if (!isValid.success) {
    return next(new apiError(400, "Invalid Inputs"));
  }

  const newProduct = new Product(isValid.data);

  newProduct.save();

  return res.json(new apiResponse(200, newProduct));
});

export const getProducts = asyncHandler(async (req, res, next) => {
  const { name, lte, gte, color, brand, type, sort } = req.query;

  const [field, order] = sort.split(/([+-])/);
  const sortOrder = order === "-" ? -1 : 1;

  if (sort && field !== "name" && field !== "price") {
    return next(new apiError(400, "Invalid sort Inputs"));
  }

  if (+gte > +lte) {
    return next(new apiError(400, "Invalid Inputs"));
  }

  const query = {};

  if (brand) query.brand = brand;
  if (color) query.color = color;
  if (type) query.type = type;
  if (gte && lte) {
    query.price = { $gte: parseFloat(gte), $lte: parseFloat(lte) };
  } else if (gte) {
    query.price = { $gte: parseFloat(gte) };
  } else if (lte) {
    query.price = { $lte: parseFloat(lte) };
  }
  if (name) {
    const regexPattern = new RegExp(name, "i");
    query.name = regexPattern;
  }

  const products = await Product.find(query).sort(
    sort ? { [field]: sortOrder } : {}
  );
  return res.json(new apiResponse(200, products));
});

export const getProductById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new apiError(404, "Product not found"));
  }
  return res.json(new apiResponse(200, product));
});

export const getFilters = asyncHandler(async (req, res, next) => {
  const colors = await Product.distinct("color");
  const brands = await Product.distinct("brand");
  const types = await Product.distinct("type");

  return res.json(new apiResponse(200, { colors, brands, types }));
});
