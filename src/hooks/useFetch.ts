import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultProduct, Product } from "../types/types";
import axios from "axios";

const API_URL: string = "https://fakestoreapi.com/products";

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (error) {
        setError(`Error fetching products: ${error}`);
      }
    };

    fetchProducts();
  }, []);

  return { products, error };
};

export const useFetchProduct = () => {
  const { id } = useParams<string>();
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(`Error fetching product: ${error}`);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, error };
};
