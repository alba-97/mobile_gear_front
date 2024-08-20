import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryName: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryName: (state, action) => {
      state.categoryName = action.payload;
    },
    clearFilter: () => initialState,
  },
});

export const { setCategoryName, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
