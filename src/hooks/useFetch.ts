import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { IProduct } from "../types/types";

const API_URL: string = "https://dummyjson.com/products";

export const useFetchProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data.products);
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
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
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
