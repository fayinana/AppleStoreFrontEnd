const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { User } from "@/types";
import axios from "axios";

export async function getUsers({
  page,
  sort,
  limit,
}): Promise<{ data: User[]; total: number }> {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      throw new Error("Token not found in local storage");
    }
    const res = await axios.get(
      `${BASE_URL}/users?sort=${sort}&limit=${limit}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}

export async function deleteUser(userId: string) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.delete(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}
export async function updateUser({
  userId,
  role,
}: {
  userId: string;
  role: string;
}) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.patch(
      `${BASE_URL}/users/${userId}`,
      { role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}
