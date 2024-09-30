import { pool } from "./db";

export const registerUserDB = async (
  username: string,
  email: string,
  hashedPassword: string
) => {
  const registerQuery = `
    INSERT INTO "user" (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`;

  const result = await pool.query(registerQuery, [
    username,
    email,
    hashedPassword,
  ]);

  return result.rows[0];
};

export const loginUserDB = async (email: string) => {
  const loginQuery = `
    SELECT * FROM "user"
    WHERE email = $1`;

  const result = await pool.query(loginQuery, [email]);
  return result.rows[0];
};

export const createGoogleUserDB = async (
  name: string,
  email: string,
  google_id: string
) => {
  const username = name;
  const createUserQuery = `
    INSERT INTO "user" (username, email, google_id, password)
    VALUES ($1, $2, $3, NULL)
    ON CONFLICT (email) DO UPDATE
    SET google_id = EXCLUDED.google_id
    RETURNING *`;

  const result = await pool.query(createUserQuery, [username, email, google_id]);
  return result.rows[0];
};
