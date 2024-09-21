import express from "express";
import cors from "cors";
import path from "path";

import { PORT } from "./config/config";

import authRoutes from "./routes/auth";
import prodRoutes from "./routes/product";
import usersRoutes from "./routes/users";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.use("/api/auth", authRoutes);
app.use("/api/product", prodRoutes);
app.use("/api/users", usersRoutes);

app.listen(PORT);
console.log("Server running on port", PORT);
