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
      `http://127.0.0.1:3700/api/v1/users?sort=${sort}&limit=${limit}&page=${page}`,
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
    const res = await axios.delete(
      `http://127.0.0.1:3700/api/v1/users/${userId}`,
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
      `http://127.0.0.1:3700/api/v1/users/${userId}`,
      { role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("===============updated data=====================");
    console.log(res.data);
    console.log("====================================");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}
