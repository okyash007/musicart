import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDb.js";
import cors from "cors";
import { userRouter } from "./router/userRouter.js";
import { errorMiddleWare } from "./middlewares/errorMiddleWare.js";
import { productRouter } from "./router/productRouter.js";
import { cartRouter } from "./router/cartRouter.js";

dotenv.config({
  path: "./.env",
});

const app = express();

connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at port : ${process.env.PORT} `);
  });
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/", (req, res) => {
  res.json({ status: "giiiii" });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);

app.use(errorMiddleWare);
