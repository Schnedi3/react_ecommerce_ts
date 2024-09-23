import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import { COOKIE_URL, PORT } from "./config/config";

import authRoutes from "./routes/authRoute";
import prodRoutes from "./routes/productRoute";
import usersRoutes from "./routes/userRoute";
import cartRoutes from "./routes/cartRoute";

export const app = express();

app.use(
  cors({
    origin: COOKIE_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.use("/api/auth", authRoutes);
app.use("/api/product", prodRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/cart", cartRoutes);


app.listen(PORT);
console.log("Server running on port", PORT);
