import { Router } from "express";
import { addProduct, getProductById, getProducts } from "../controllers/productController.js";

export const productRouter = Router();

productRouter.route("/add").post(addProduct);
productRouter.route("/").get(getProducts);
productRouter.route("/:id").get(getProductById);