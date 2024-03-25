import { Router } from "express";
import {
  addProduct,
  getFilters,
  getProductById,
  getProducts,
} from "../controllers/productController.js";

export const productRouter = Router();

productRouter.route("/add").post(addProduct);
productRouter.route("/filters").get(getFilters);
productRouter.route("/").get(getProducts);
productRouter.route("/:id").get(getProductById);
