import { pool } from "./db";

export const getUsersDB = async () => {
  const getUsersQuery = `SELECT * FROM "user"`;

  const result = await pool.query(getUsersQuery);
  return result.rows;
};

export const getUserDB = async (id: number) => {
  const getUserQuery = `
    SELECT * FROM "user"
    WHERE id = $1`;

  const result = await pool.query(getUserQuery, [id]);
  return result.rows[0];
};

export const deleteUserDB = async (id: number) => {
  const deleteUserQuery = `
    DELETE FROM "user"
    WHERE id = $1`;

  await pool.query(deleteUserQuery, [id]);
};

export const updateUsernamerDB = async (username: string, id: number) => {
  const updateUsernameQuery = `
    UPDATE "user"
    SET username = $1
    WHERE id = $2
    RETURNING *`;

  const result = await pool.query(updateUsernameQuery, [username, id]);
  return result.rows[0];
};
