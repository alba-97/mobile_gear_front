import { CategoryResponse } from "@/interfaces/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryState {
  categories: CategoryResponse[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addCategory: (state, action: PayloadAction<CategoryResponse>) => {
      state.categories.push(action.payload);
    },
    editCategory: (state, action) => {
      const updatedCategory = action.payload;
      const existingCategory = state.categories.find(
        (category) => category.id === updatedCategory.id
      );
      if (existingCategory) {
        Object.assign(existingCategory, updatedCategory);
      }
    },
    deleteCategory: (state, action) => {
      const categoryId = action.payload;
      state.categories = state.categories.filter(
        (category) => category.id !== categoryId
      );
    },
  },
});

export const {
  setCategories,
  setLoading,
  setError,
  addCategory,
  editCategory,
  deleteCategory,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
