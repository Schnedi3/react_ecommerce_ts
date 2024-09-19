import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { IProduct } from "../types/types";

const API_URL: string = "https://dummyjson.com/products";

export const useFetchProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data.products);
      } catch (error) {
        setError(`Error fetching products: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export const useFetchProduct = () => {
  const { id } = useParams<string>();
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(`Error fetching product: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
