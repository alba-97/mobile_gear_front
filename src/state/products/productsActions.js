import axios from "axios";
import {
  setProducts,
  setProduct,
  setDiscountedProducts,
  setLoading,
  setError,
  deleteProduct as deleteProductAction,
} from "./productsSlice";
import * as settings from "../../settings";

export const fetchProducts =
  (searchTerm = "", filters = {}) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${settings.axiosURL}/products`, {
        params: {
          ...filters,
          modelName: searchTerm,
        },
      });
      dispatch(setProducts(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchProduct = (productId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${settings.axiosURL}/products/${productId}`
    );
    dispatch(setProduct(response.data));
  } catch {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchDiscountedProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(
      `${settings.axiosURL}/products/discounted`
    );

    dispatch(setDiscountedProducts(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addProduct = (productData) => async () => {
  try {
    await axios.post(`${settings.axiosURL}/admin/products`, productData);
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const editProduct = (product) => async () => {
  try {
    const {
      id,
      name,
      stock,
      description,
      price,
      discount,
      features,
      product_img,
    } = product;
    await axios.put(`${settings.axiosURL}/admin/products/${id}`, {
      name,
      description,
      stock,
      price,
      discount,
      features,
      product_img,
    });
  } catch (error) {
    console.error("edit error: ", error);
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    await axios.delete(`${settings.axiosURL}/admin/products/${productId}`);
    dispatch(deleteProductAction(productId));
  } catch (error) {
    console.error("delete error: ", error);
  }
};
