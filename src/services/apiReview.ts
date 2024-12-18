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
    const res = await axios.post(
      `http://127.0.0.1:3700/api/v1/products/${id}/reviews`,
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
      `http://127.0.0.1:3700/api/v1/products/${productId}/reviews/${id}`,
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
