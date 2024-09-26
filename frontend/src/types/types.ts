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
  addToCart: (product: IProduct, quantity: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  deleteProduct: (id: number) => void;
  itemsInCart: number;
  totalAmount: number;
}

export interface ICategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (selectedCategory: string) => void;
  products: IProduct[];
}

export interface IContact {
  name: string;
  email: string;
  message: string;
}

export interface ILogin {
  username?: string;
  email: string;
  password: string;
  role?: string;
}

export interface IRegister {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthContextType {
  user: ILogin | IRegister | null;
  googleLogin: () => void;
  login: (user: ILogin) => void;
  signup: (user: IRegister) => void;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export interface ISearchProps {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
}

export interface IAddress {
  id: number;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
}
