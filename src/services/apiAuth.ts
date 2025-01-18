const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import {
  LoginReq,
  PasswordChangeData,
  ResetPasswordReq,
  SignupReq,
  User,
} from "@/types";
import axios from "axios";
axios.defaults.withCredentials = true;

export async function login(data: LoginReq): Promise<User> {
  try {
    const res = await axios.post<{
      status: string;
      token: string;
      user: User;
    }>(`${BASE_URL}/auth/login`, data);
    if (res.data.status === "success") {
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("token", JSON.stringify(res.data.token));
    } else {
      localStorage.setItem("isAuthenticated", JSON.stringify(false));
    }
    return res.data.user;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Some Thing Error");
    }
  }
}

export async function signup(data: SignupReq): Promise<User> {
  try {
    const res = await axios.post<User>(`${BASE_URL}/auth/register`, data);
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Some Thing Error");
    }
  }
}

export async function forgotPassword(data: { email: string }) {
  try {
    const res = await axios.post(`${BASE_URL}/auth/forgotPassword`, data);
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Some Thing Error");
    }
  }
}

export async function resetPassword(data: ResetPasswordReq) {
  try {
    const res = await axios.post(
      `${BASE_URL}/auth/resetPassword/${data.token}`,
      data
    );
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Some Thing Error");
    }
  }
}

export async function logout() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Some Thing Error");
    }
  }
}

export async function updatePassword(data: PasswordChangeData) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.patch(`${BASE_URL}/auth/changePassword`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Some Thing Error");
    }
  }
}

export async function updateProfile(data: User | FormData) {
  axios.defaults.withCredentials = true;
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.patch(`${BASE_URL}/users/updateMe`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Some Thing Error");
    }
  }
}
export async function updateImage() {}
