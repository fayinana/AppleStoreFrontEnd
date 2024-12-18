import axios from "axios";
import { Order } from "@/types/index";

export async function getOrder(id: string) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get<{ data: Order }>(
      `http://127.0.0.1:3700/api/v1/orders/${id}`,
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

export async function getAllOrders() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get<{ data: Order[] }>(
      `http://127.0.0.1:3700/api/v1/orders`,
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
      throw new Error("Something went wrong please");
    }
  }
}
export async function getMyOrders() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get<{ data: Order[] }>(
      `http://127.0.0.1:3700/api/v1/orders/myOrders`,
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
    const res = await axios.get(
      `http://127.0.0.1:3700/api/v1/orders/ordersStatus`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    const res = await axios.get(
      `http://127.0.0.1:3700/api/v1/orders/monthlyStat`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
