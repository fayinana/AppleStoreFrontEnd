import { Product } from "@/types";
import axios from "axios";
axios.defaults.withCredentials = true;
export async function addProduct(data: Product) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.post<Product>(
      "http://127.0.0.1:3700/api/v1/products",
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
