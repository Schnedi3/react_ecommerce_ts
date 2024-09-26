import { pool } from "./db";

export const getUsersDB = async () => {
  const getQuery = "SELECT * FROM users";

  const result = await pool.query(getQuery);
  return result.rows;
};

export const getUserDB = async (id: number) => {
  const getUserQuery = `
    SELECT * FROM users
    WHERE id = $1`;

  const result = await pool.query(getUserQuery, [id]);
  return result.rows[0];
};

export const removeUserDB = async (id: number) => {
  const removeQuery = `
    DELETE FROM users
    WHERE id = $1`;

  await pool.query(removeQuery, [id]);
};
