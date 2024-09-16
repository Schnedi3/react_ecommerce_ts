export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
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

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface CartItem extends IProduct {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: IProduct) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  deleteProduct: (productId: number) => void;
  totalCart: () => number;
}

export interface IProductCardProps {
  product: IProduct;
  error: string | null;
}

export interface ICategoriesProps {
  setFilteredProducts: (filteredProducts: IProduct[]) => void;
}

export interface IContactForm {
  name: string;
  email: string;
  message: string;
}
