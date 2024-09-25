import { Request, Response } from "express";
import bcrypt from "bcrypt";
import axios from "axios";

import { generateToken } from "../libs/generateToken";
import { createCartForUser } from "../database/cartDB";
import {
  createGoogleUserDB,
  loginUserDB,
  registerUserDB,
} from "../database/authDB";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await registerUserDB(username, email, hashedPassword);

    // create a cart
    const userId = result.id;
    const cart = await createCartForUser(userId);

    // generate token
    const token = generateToken(result.id);
    // Set token as a cookie
    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "User registered succesfully",
      result,
      cart,
      token,
    });
  } catch (error: any) {
    if (error.code === "23505") {
      res.status(403).json({ success: false, message: "Email already exist" });
    }
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

    const token = generateToken(result.id);
    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "User logged in succesfully",
      result,
      token,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginGoogle = async (req: Request, res: Response) => {
  const { accessToken } = req.body;

  const tokenURL = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;

  try {
    const userInfo = await axios.get(tokenURL);
    const { name, email, sub } = userInfo.data;

    const result = await createGoogleUserDB(name, email, sub);

    // create a cart
    const userId = result.id;
    const cart = await createCartForUser(userId);

    const token = generateToken(result.id);
    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "User logged in succesfully",
      result,
      cart,
      token,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
