export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: string;
  sizes: string[];
  images: string[];
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}
