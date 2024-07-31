export interface Product {
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

export const defaultProduct: Product = {
  id: 0,
  title: "Loading...",
  description: "Loading...",
  category: "Loading...",
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  tags: ["Loading...", "Loading..."],
  brand: "Loading...",
  sku: "Loading...",
  weight: 0,
  dimensions: {
    width: 0,
    height: 0,
    depth: 0
  },
  warrantyInformation: "Loading...",
  shippingInformation: "Loading...",
  availabilityStatus: "Loading...",
  reviews: [
    {
      rating: 0,
      comment: "Loading...",
      date: "Loading...",
      reviewerName: "Loading...",
      reviewerEmail: "Loading..."
    },
    {
      rating: 0,
      comment: "Loading...",
      date: "Loading...",
      reviewerName: "Loading...",
      reviewerEmail: "Loading..."
    },
    {
      rating: 0,
      comment: "Loading...",
      date: "Loading...",
      reviewerName: "Loading...",
      reviewerEmail: "Loading..."
    },
  ],
  returnPolicy: "Loading...",
  minimumOrderQuantity: 0,
  meta: {
    createdAt: "Loading...",
    updatedAt: "Loading...",
    barcode: "Loading...",
    qrCode: "https://dummyjson.com/image/150"
  },
  images: [
    "https://dummyjson.com/image/150"
  ],
  thumbnail: "https://dummyjson.com/image/150"
};

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  deleteProduct: (productId: number) => void;
  totalCart: () => number;
}

export interface FormValues {
  name: string;
  email: string;
  message: string;
}
