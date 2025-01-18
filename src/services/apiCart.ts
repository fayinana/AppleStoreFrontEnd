const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";
import { Cart } from "@/types/index";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
export async function addToCart({ id, price, quantity, product }) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.post(
      `${BASE_URL}/carts/${id}`,
      {
        quantity,
        price,
        product,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}
export async function getMyCart<Cart>() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get<{ status: string; cart: Cart }>(
      `${BASE_URL}/carts/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.cart;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}

export async function deleteMyCart(id) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.delete(`${BASE_URL}/carts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.carts;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}

export async function updateCart({ id, cart }: { id: string; cart: Cart }) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.patch(`${BASE_URL}/carts/${id}`, cart, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.cart;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}
