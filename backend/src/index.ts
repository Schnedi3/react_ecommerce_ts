import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import { FRONTEND_URL, PORT } from "./config/config";

import authRoutes from "./routes/authRoute";
import productRoutes from "./routes/productRoute";
import userRoutes from "./routes/userRoute";
import cartRoutes from "./routes/cartRoute";
import addressRoutes from "./routes/addressRoute";
import orderRoutes from "./routes/orderRoute";
import paymentRoutes from "./routes/paymentRoute";

export const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT);
console.log("Server running on port", PORT);
