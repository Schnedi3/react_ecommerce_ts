import { pool } from "./db";

export const registerUserDB = async (
  username: string,
  email: string,
  hashedPassword: string
) => {
  const registerQuery =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";

  const result = await pool.query(registerQuery, [
    username,
    email,
    hashedPassword,
  ]);

  return result.rows[0];
};

export const loginUserDB = async (email: string) => {
  const loginQuery = "SELECT * FROM users WHERE email = $1";
  const result = await pool.query(loginQuery, [email]);

  return result.rows[0];
};
