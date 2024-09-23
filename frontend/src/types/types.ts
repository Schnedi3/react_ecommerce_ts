export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  sizes: string[];
  images: string[];
  quantity: number;
}

export interface CartItem extends IProduct {
  product_id: number;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  getCart: () => void;
  quantityInCart: () => number;
  addToCart: (product: IProduct, quantity: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  deleteProduct: (id: number) => void;
  totalCart: () => number;
}

export interface ICategoriesProps {
  products: IProduct[];
  setFilteredProducts: (filteredProducts: IProduct[]) => void;
}

export interface IContact {
  name: string;
  email: string;
  message: string;
}

export interface IAuth {
  username?: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthContextType {
  user: IAuth | null;
  signup: (user: IAuth) => void;
  login: (user: IAuth) => void;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
