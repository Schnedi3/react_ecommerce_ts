export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const defaultProduct: Product = {
  id: 0,
  title: "Loading...",
  price: 0,
  description: "Loading description...",
  category: "Loading category...",
  image: "https://placehold.co/150x150?text=Hello\nWorld",
};

export interface FormValues {
  name: string;
  email: string;
  message: string;
}
