import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export const generateToken = (user_id: number) => {
  return jwt.sign({ user_id }, JWT_SECRET);
};
