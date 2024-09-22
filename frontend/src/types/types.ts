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

export interface CartItem extends IProduct {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  quantityInCart: () => number;
  addToCart: (product: IProduct) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  deleteProduct: (productId: number) => void;
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
