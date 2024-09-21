import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { generateToken } from "../libs/generateToken";
import { pool } from "../database/db";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  const registerQuery =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";

  try {
    const { rows } = await pool.query(registerQuery, [
      username,
      email,
      hashedPassword,
    ]);

    // generate token
    const token = generateToken(rows[0].id);

    res.status(200).json({
      success: true,
      message: "User registered succesfully",
      user: rows[0],
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
    const loginQuery = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(loginQuery, [email]);

    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    // generate token
    const token = generateToken(rows[0].id);

    res.status(200).json({
      success: true,
      message: "User logged in succesfully",
      user: rows[0],
      token,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
