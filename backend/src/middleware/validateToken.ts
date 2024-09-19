import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/config";
import { IUser } from "../types/types";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user as IUser;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
