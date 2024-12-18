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
