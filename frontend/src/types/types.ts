export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  images: string[];
  thumbnail: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
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

export interface IRegister {
  username: string;
  email: string;
  password: string;
}

export interface ILogin {
  username: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: IRegister | ILogin | null;
  signup: (user: IRegister) => void;
  login: (user: ILogin) => void;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  error: string | null;
}
