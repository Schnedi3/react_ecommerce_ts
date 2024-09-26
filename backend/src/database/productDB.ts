import { pool } from "./db";

export const addProductDB = async (
  title: string,
  description: string,
  price: string,
  category: string,
  subcategory: string,
  sizes: string[],
  imageUrls: string[]
) => {
  const addQuery = `
    INSERT INTO product (title, description, price, category, subcategory, sizes, images)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;

  const result = await pool.query(addQuery, [
    title,
    description,
    price,
    category,
    subcategory,
    sizes,
    imageUrls,
  ]);

  return result.rows[0];
};

export const getProductsDB = async () => {
  const productsQuery = "SELECT * FROM product";

  const result = await pool.query(productsQuery);
  return result.rows;
};

export const getProductDB = async (id: number) => {
  const productQuery = `
    SELECT * FROM product
    WHERE id = $1`;

  const result = await pool.query(productQuery, [id]);
  return result.rows[0];
};

export const removeProductDB = async (id: number) => {
  const removeQuery = `
    DELETE FROM product
    WHERE id = $1`;

  await pool.query(removeQuery, [id]);
};
