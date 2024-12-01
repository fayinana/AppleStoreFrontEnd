import { LoginReq, ResetPasswordReq, SignupReq, User } from "@/types";
import axios from "axios";
axios.defaults.withCredentials = true;
// const api = axios.create({
//   baseURL: "http://127.0.0.1:3700/api/v1",
// });

export async function login(data: LoginReq): Promise<User> {
  try {
    const res = await axios.post<User>(
      "http://127.0.0.1:3700/api/v1/auth/login",
      data
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function signup(data: SignupReq): Promise<User> {
  try {
    const res = await axios.post<User>(
      "http://127.0.0.1:3700/api/v1/auth/register",
      data
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function forgotPassword(data: { email: string }) {
  try {
    const res = await axios.post(
      "http://127.0.0.1:3700/api/v1/auth/forgotPassword",
      data
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function resetPassword(data: ResetPasswordReq) {
  try {
    const res = await axios.post(
      `http://127.0.0.1:3700/api/v1/auth/resetPassword/${data.token}`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
