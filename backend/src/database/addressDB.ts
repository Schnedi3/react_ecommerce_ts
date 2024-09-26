import { pool } from "./db";

export const getAddressDB = async (userId: number) => {
  const getQuery = `
    SELECT * FROM address
    WHERE user_id = $1`;

  const result = await pool.query(getQuery, [userId]);
  return result.rows;
};

export const addAddressDB = async (
  address_line1: string,
  address_line2: string,
  city: string,
  state: string,
  zip_code: string,
  phone: string,
  userId: number
) => {
  const addQuery = `
    INSERT INTO address (address_line1, address_line2, city, state, zip_code, phone, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;

  const result = await pool.query(addQuery, [
    address_line1,
    address_line2,
    city,
    state,
    zip_code,
    phone,
    userId,
  ]);

  return result.rows[0];
};

export const removeAddressDB = async (id: number) => {
  const removeQuery = `
    DELETE FROM address
    WHERE id = $1`;

  await pool.query(removeQuery, [id]);
};
