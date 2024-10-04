import { pool } from "./db";

export const getAddressDB = async (user_id: number) => {
  const getQuery = `
    SELECT * FROM address
    WHERE user_id = $1`;

  const result = await pool.query(getQuery, [user_id]);
  return result.rows;
};

export const addAddressDB = async (
  first_name: string,
  last_name: string,
  phone: string,
  street: string,
  number: string,
  door: string,
  city: string,
  state: string,
  zip_code: string,
  user_id: number
) => {
  const addQuery = `
    INSERT INTO address (first_name, last_name, phone, street, number, door, city, state, zip_code, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`;

  const result = await pool.query(addQuery, [
    first_name,
    last_name,
    phone,
    street,
    number,
    door,
    city,
    state,
    zip_code,
    user_id,
  ]);

  return result.rows[0];
};

export const deleteAddressDB = async (id: number) => {
  const removeQuery = `
    DELETE FROM address
    WHERE id = $1`;

  await pool.query(removeQuery, [id]);
};

export const updateAddressDB = async (
  first_name: string,
  last_name: string,
  phone: string,
  street: string,
  number: string,
  door: string,
  city: string,
  state: string,
  zip_code: string,
  id: number
) => {
  const updateQuery = `
    UPDATE address
    SET first_name = $1, last_name = $2, phone = $3, street = $4, number = $5, door = $6, city = $7, state = $8, zip_code = $9
    WHERE id = $10
    RETURNING *`;

  const result = await pool.query(updateQuery, [
    first_name,
    last_name,
    phone,
    street,
    number,
    door,
    city,
    state,
    zip_code,
    id,
  ]);

  return result.rows[0];
};
