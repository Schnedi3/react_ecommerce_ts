import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultProduct, Product } from '../types/types';

const API_URL: string = "https://fakestoreapi.com/products";

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(`Error fetching products: ${error}`);
      }
    };

    fetchProducts();
  }, []);

  return { products };
};

export const useFetchProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>(defaultProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(`Error fetching product: ${error}`);
      }
    };

    fetchProduct();
  }, [id]);

  return { product };
};
