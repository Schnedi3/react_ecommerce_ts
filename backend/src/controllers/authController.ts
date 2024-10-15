import { Request, Response } from "express";
import bcrypt from "bcrypt";
import axios from "axios";
import jwt from "jsonwebtoken";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../libs/generateToken";
import { createCartForUser } from "../database/cartDB";
import {
  createGoogleUserDB,
  loginUserDB,
  registerUserDB,
  resetPasswordDB,
} from "../database/authDB";
import { ACCESS_TOKEN, JWT_SECRET, REFRESH_TOKEN } from "../config/config";

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginUserDB(email);

    if (result.role === "user") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid admin credentials" });
    }

    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);
    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "Logged in succesfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginGoogle = async (req: Request, res: Response) => {
  const { access_token } = req.body;

  const tokenURL = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`;

  try {
    const userInfo = await axios.get(tokenURL);
    const { name, email, sub } = userInfo.data;

    const result = await createGoogleUserDB(name, email, sub);

    // create a cart
    const userId = result.id;
    const cart = await createCartForUser(userId);

    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);
    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "Logged in succesfully",
      result,
      cart,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginUserDB(email);

    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);
    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "Logged in succesfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await registerUserDB(username, email, hashedPassword);

    // create a cart
    const userId = result.id;
    const cart = await createCartForUser(userId);

    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);
    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "Registered succesfully",
      result,
      cart,
    });
  } catch (error: any) {
    if (error.code === "23505") {
      res.status(403).json({ success: false, message: "Email already exist" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await resetPasswordDB(hashedPassword, email);

    res
      .status(200)
      .json({ success: true, message: "Password updated succesfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const tokenController = (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res
      .status(403)
      .json({ success: false, message: "Missing refresh token" });
  }

  try {
    jwt.verify(refreshToken, JWT_SECRET, async (err: any, decoded: any) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, message: "Verification failed" });
      }

      const foundUser = await loginDB(decoded.email);
      const newAccessToken = generateAccessToken(foundUser);
      setAccessCookie(res, newAccessToken);

      res.status(200).json({
        success: true,
        message: "Token refreshed succesfully",
      });
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const setAccessCookie = (res: Response, accessToken: string) => {
  res.cookie(ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
};

const setRefreshCookie = (res: Response, refreshToken: string) => {
  res.cookie(REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
};
