import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDb.js";

dotenv.config({
  path: "./.env",
});

const app = express();

connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at port : ${process.env.PORT} `);
  });
});

app.get("/", (req, res) => {
  res.json({ status: "giiiii" });
});
