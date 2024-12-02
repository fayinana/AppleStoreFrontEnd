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
    }>("http://127.0.0.1:3700/api/v1/auth/login", data);
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
    const res = await axios.post<User>(
      "http://127.0.0.1:3700/api/v1/auth/register",
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

export async function forgotPassword(data: { email: string }) {
  try {
    const res = await axios.post(
      "http://127.0.0.1:3700/api/v1/auth/forgotPassword",
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

export async function resetPassword(data: ResetPasswordReq) {
  try {
    const res = await axios.post(
      `http://127.0.0.1:3700/api/v1/auth/resetPassword/${data.token}`,
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
      `http://127.0.0.1:3700/api/v1/auth/logout`,
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
    const res = await axios.patch(
      "http://127.0.0.1:3700/api/v1/auth/changePassword",
      data,
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

export async function updateProfile(data: User | FormData) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.patch(
      "http://127.0.0.1:3700/api/v1/users/updateMe",
      data,
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
export async function updateImage() {}
