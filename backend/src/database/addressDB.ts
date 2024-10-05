import { pool } from "./db";

export const getAddressDB = async (userId: number) => {
  const getQuery = `
    SELECT * FROM address
    WHERE user_id = $1`;

  const result = await pool.query(getQuery, [userId]);
  return result.rows;
};

export const addAddressDB = async (
  firstName: string,
  lastName: string,
  phone: string,
  street: string,
  number: string,
  door: string,
  city: string,
  state: string,
  zipCode: string,
  userId: number
) => {
  const addQuery = `
    INSERT INTO address (first_name, last_name, phone, street, number, door, city, state, zip_code, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`;

  const result = await pool.query(addQuery, [
    firstName,
    lastName,
    phone,
    street,
    number,
    door,
    city,
    state,
    zipCode,
    userId,
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
  firstName: string,
  lastName: string,
  phone: string,
  street: string,
  number: string,
  door: string,
  city: string,
  state: string,
  zipCode: string,
  id: number
) => {
  const updateQuery = `
    UPDATE address
    SET first_name = $1, last_name = $2, phone = $3, street = $4, number = $5, door = $6, city = $7, state = $8, zip_code = $9
    WHERE id = $10
    RETURNING *`;

  const result = await pool.query(updateQuery, [
    firstName,
    lastName,
    phone,
    street,
    number,
    door,
    city,
    state,
    zipCode,
    id,
  ]);

  return result.rows[0];
};
