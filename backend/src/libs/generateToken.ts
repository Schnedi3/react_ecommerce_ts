import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export const generateToken = (id: number) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "2h" });
};
