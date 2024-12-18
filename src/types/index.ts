export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  image?: string;
}

export type LoginReq = {
  email: string;
  password: string;
};

export type SignupReq = {
  email: string;
  password: string;
  passwordConfirm: string;
  lastName: string;
  firstName: string;
  role?: "admin" | "user";
  image: string;
  order: [];
  cart: [];
};

export type ResetPasswordReq = {
  password: string;
  passwordConfirm: string;
  token?: string;
};

export type PasswordChangeData = {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
};

export interface ProductSpecification {
  key: string;
  value: string;
}

type ReviewUser = {
  fullName: string;
  id: string;
  image: string;
};
export interface Review {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  product: string;
  user: ReviewUser;
}
export type ReviewFormData = {
  review: string;
  rating: number;
};

export interface Product {
  _id?: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  stock: number;
  coverImage: string;
  images?: string[];
  specifications: ProductSpecification[];
  ratingsAverage?: number;
  ratingsQuantity?: number;
  createdAt?: string;
  updatedAt?: string;
  reviews?: Review[];
}

export type QueryType = {
  limit: number;
  page: number;
  sort: string;
};

export interface Specification {
  key: string;
  value: string;
}

export interface ProductFormData {
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  coverImage: string;
  specifications: Specification[];
}

export interface ProductInfo {
  id: string;
  name: string;
  price: number;
  category: string;
  coverImage: string;
}

export interface CartProduct {
  id: string;
  product: ProductInfo;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  user: string;
  products: CartProduct[];
  createdAt: Date;
  updatedAt: Date;
  totalPrice: number;
}

export type PopulatedProduct = {
  _id: string;
  name: string;
  price: number;
  category: string;
  coverImage: string;
};

export type OrderProduct = {
  _id: string;
  product: PopulatedProduct;
  quantity: number;
  price: number;
  total: number;
};

export type Order = {
  _id: string;
  user: User; // User ID
  products: OrderProduct[];
  totalPrice: number;
  paymentIntentId?: string;
  paymentStatus: "pending" | "paid" | "failed" | "completed" | "canceled";
  status: "processing" | "shipped" | "delivered" | "canceled";
  shippingStatus: "not_shipped" | "shipped" | "delivered";
  createdAt: string;
  updatedAt: string;
};
