import axios from "axios";
import * as settings from "../../settings";
import { ProductResponse, ProductBody } from "@/interfaces/Product";
import getHeaders from "@/hooks/getHeaders";

export const fetchProducts = async (
  filters = {}
): Promise<ProductResponse[]> => {
  const { data } = await axios.get<ProductResponse[]>(
    `${settings.axiosURL}/products`,
    {
      params: filters,
    }
  );
  return data;
};

export const fetchProduct = async (productId: number) => {
  const { data } = await axios.get(
    `${settings.axiosURL}/products/${productId}`
  );
  return data;
};

export const fetchDiscountedProducts = async () => {
  const { data } = await axios.get(`${settings.axiosURL}/products/discounted`);
  return data;
};

export const addProduct = async (productData: ProductBody) => {
  await axios.post(`${settings.axiosURL}/products`, productData, getHeaders());
};

export const editProduct = async (id: number, product: ProductBody) => {
  try {
    const { name, stock, description, price, discount, features, productImg } =
      product;
    await axios.put(
      `${settings.axiosURL}/products/${id}`,
      {
        name,
        description,
        stock,
        price,
        discount,
        features,
        productImg,
      },
      getHeaders()
    );
  } catch (error) {
    console.error("edit error: ", error);
  }
};

export const deleteProduct = async (productId: number) => {
  await axios.delete(
    `${settings.axiosURL}/products/${productId}`,
    getHeaders()
  );
};
