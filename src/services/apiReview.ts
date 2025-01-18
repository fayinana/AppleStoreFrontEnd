const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { ReviewFormData } from "@/types";
import axios from "axios";

export async function addReview({
  data,
  id,
}: {
  data: ReviewFormData;
  id: string;
}) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      throw new Error("Token not found in local storage");
    }
    const res = await axios.post(`${BASE_URL}/products/${id}/reviews`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}
export async function updateReview({
  data,
  id,
  productId,
}: {
  data: ReviewFormData;
  id: string;
  productId: string;
}) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      throw new Error("Token not found in local storage");
    }
    const res = await axios.patch(
      `${BASE_URL}/products/${productId}/reviews/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}
