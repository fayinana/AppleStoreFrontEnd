const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";
import { Order } from "@/types/index";

export async function getOrder(id: string) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get<{ data: Order }>(`${BASE_URL}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export async function getAllOrders() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get<{ data: Order[] }>(`${BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong please");
    }
  }
}
export async function getMyOrders() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get<{ data: Order[] }>(
      `${BASE_URL}/orders/myOrders`,
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
export async function getOrdersStatus() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`${BASE_URL}/orders/ordersStatus`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.revenueData;
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
export async function getMonthlyStat() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`${BASE_URL}/orders/monthlyStat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.monthlyStat;
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
