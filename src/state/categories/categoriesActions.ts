import axios, { isAxiosError } from "axios";
import {
  setCategories,
  setLoading,
  setError,
  deleteCategory as deleteCategoryAction,
} from "./categoriesSlice";
import * as settings from "../../settings";
import getHeaders from "../../hooks/getHeaders";
import { Dispatch } from "@reduxjs/toolkit";

export const fetchCategories = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(
      `${settings.axiosURL}/categories`,
      getHeaders()
    );
    dispatch(setCategories(response.data));
  } catch (error) {
    if (isAxiosError(error)) dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addCategory = (name: string) => async () => {
  try {
    await axios.post(
      `${settings.axiosURL}/categories`,
      {
        name,
      },
      getHeaders()
    );
  } catch (error) {
    console.error("add error:", error);
  }
};

export const editCategory =
  (category: { id: number; name: string }) => async () => {
    try {
      const { id, name } = category;
      await axios.put(
        `${settings.axiosURL}/categories/${id}`,
        {
          name,
        },
        getHeaders()
      );
    } catch (error) {
      console.error("edit error: ", error);
    }
  };

export const deleteCategory =
  (categoryId: number) => async (dispatch: Dispatch) => {
    try {
      await axios.delete(
        `${settings.axiosURL}/categories/${categoryId}`,
        getHeaders()
      );
      dispatch(deleteCategoryAction(categoryId));
    } catch (error) {
      console.error("delete error: ", error);
    }
  };