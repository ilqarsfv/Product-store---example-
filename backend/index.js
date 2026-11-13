import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/product.route.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/products", router);

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
