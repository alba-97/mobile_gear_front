import axios from "axios";
import { addCategory as addCategoryAction } from "./categoriesSlice";
import * as settings from "../../settings";
import getHeaders from "../../hooks/getHeaders";
import { Dispatch } from "@reduxjs/toolkit";

export const fetchCategories = async () => {
  const { data } = await axios.get(
    `${settings.axiosURL}/categories`,
    getHeaders()
  );
  return data;
};

export const addCategory = async (name: string) => {
  await axios.post(
    `${settings.axiosURL}/categories`,
    {
      name,
    },
    getHeaders()
  );
};

export const editCategory = async (id: number, name: string) => {
  await axios.put(
    `${settings.axiosURL}/categories/${id}`,
    {
      name,
    },
    getHeaders()
  );
};

export const deleteCategory = async (categoryId: number) => {
  await axios.delete(
    `${settings.axiosURL}/categories/${categoryId}`,
    getHeaders()
  );
};
