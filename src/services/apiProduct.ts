import { Product, QueryType } from "@/types";
import axios from "axios";
axios.defaults.withCredentials = true;

export async function addProduct(data: Product | FormData) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.post<{ data: Product }>(
      "http://127.0.0.1:3700/api/v1/products",
      data,
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
      throw new Error("Some Thing Error");
    }
  }
}

export async function getProducts({
  page,
  sort,
  limit,
}: QueryType): Promise<{ data: Product[]; total: number }> {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get<{ data: Product[]; total: number }>(
      `http://127.0.0.1:3700/api/v1/products?sort=${sort}&limit=${limit}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data: res.data.data || [], total: res.data.total };
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

export async function getRelatedProducts(category: string): Promise<{
  data: Product[];
  total: number;
}> {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get<{ data: Product[]; total: number }>(
      `http://127.0.0.1:3700/api/v1/products/relatedProduct/${category}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data: res.data.data || [], total: res.data.total };
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

export async function getProduct(id: string) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get<{ data: Product }>(
      `http://127.0.0.1:3700/api/v1/products/${id}`,
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

export async function editProduct({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.patch<{ data: Product }>(
      `http://127.0.0.1:3700/api/v1/products/${id}`,
      data,
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
