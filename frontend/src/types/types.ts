export interface AuthContextType {
  user: ILogin | IRegister | null;
  googleLogin: () => void;
  login: (user: ILogin) => void;
  signup: (user: IRegister) => void;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export interface CartItem extends IProduct {
  product_id: number;
  quantity: number;
  size: string;
}

export interface IAddress {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  street: string;
  number: string;
  door: string;
  city: string;
  state: string;
  zip_code: string;
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

export interface IOrder {
  order_amount: number;
  order_date: Date;
  order_id: number;
  order_status: string;
  products: IOrderProduct[];
}

interface IOrderProduct {
  id: number;
  images: string[];
  price: number;
  quantity: number;
  size: string;
  title: string;
}

export interface IRegister {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface ISearchProps {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
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
  quantity: number;
}

export interface ShopContextType {
  // address
  getAddress: () => void;
  addressList: IAddress[];
  setAddressList: (addressList: IAddress[]) => void;
  isModalAddress: boolean;
  setIsModalAddress: (isModalAddress: boolean) => void;
  // cart
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  getCart: () => void;
  itemsInCart: number;
  totalAmount: number;
}
