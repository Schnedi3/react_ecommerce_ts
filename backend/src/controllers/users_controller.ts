import { Request, Response } from "express";

import { pool } from "../database/db";

export const listUsers = async (req: Request, res: Response) => {
  try {
    const usersQuery = "SELECT * FROM users";

    const { rows } = await pool.query(usersQuery);

    res.status(200).json({ success: true, rows });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const removeQuery = "DELETE FROM users WHERE id = $1";

    await pool.query(removeQuery, [id]);

    res.status(200).json({ success: true, message: "User removed" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
