import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
export async function addToCart({ id, price, quantity, product }) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.post(
      `http://127.0.0.1:3700/api/v1/carts/${id}`,
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
export async function getMyCart() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`http://127.0.0.1:3700/api/v1/carts/`, {
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

export async function deleteMyCart(id) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.delete(`http://127.0.0.1:3700/api/v1/carts/${id}`, {
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

export async function updateCart({ id, cart }) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.patch(
      `http://127.0.0.1:3700/api/v1/carts/${id}`,
      cart,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
