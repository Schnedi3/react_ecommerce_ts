export interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  loading:boolean;
  login: (user: ILogin) => void;
  logout: () => void;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IOrder {
  city: string;
  door: string;
  email: string;
  first_name: string;
  last_name: string;
  number: string;
  order_date: Date;
  order_id: number;
  payment_method: string;
  phone: string;
  products: IOrderProduct[];
  state: string;
  order_status: string;
  street: string;
  order_amount: number;
  userId: number;
  username: string;
  zip_code: string;
}

interface IOrderProduct {
  category: string;
  images: string[];
  price: number;
  id: number;
  title: string;
  quantity: number;
  size: string;
  subcategory: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
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
