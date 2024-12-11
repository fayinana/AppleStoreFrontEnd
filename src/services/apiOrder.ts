import axios from "axios";

export async function getOrder(id: string) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`http://127.0.0.1:3700/api/v1/orders/${id}`, {
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
    const res = await axios.get(`http://127.0.0.1:3700/api/v1/orders`, {
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
export async function getMyOrders() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`http://127.0.0.1:3700/api/v1/orders`, {
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
