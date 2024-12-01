export interface User {
  id: string;
  name: string;
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
