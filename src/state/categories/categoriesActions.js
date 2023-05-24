import axios from "axios";
import {
  setCategories,
  setLoading,
  setError,
  deleteCategory as deleteCategoryAction,
} from "./categoriesSlice";
import * as settings from "../../settings";

export const fetchCategories = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${settings.axiosURL}/categories`);
    dispatch(setCategories(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addCategory = (name) => async () => {
  try {
    await axios.post(`${settings.axiosURL}/categories`, {
      name,
    });
  } catch (error) {
    console.error("add error:", error);
  }
};

export const editCategory = (category) => async () => {
  try {
    const { id, name } = category;
    await axios.put(`${settings.axiosURL}/categories/${id}`, {
      name,
    });
  } catch (error) {
    console.error("edit error: ", error);
  }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    await axios.delete(`${settings.axiosURL}/categories/${categoryId}`);
    dispatch(deleteCategoryAction(categoryId));
  } catch (error) {
    console.error("delete error: ", error);
  }
};
