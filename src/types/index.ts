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

export interface Review {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  product: string;
  user: string;
}

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
  search: string;
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
