import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    checkoutRequest: (state) => {
      state.loading = true;
    },
    checkoutSuccess: (state) => {
      state.loading = false;
    },
    checkoutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { checkoutRequest, checkoutSuccess, checkoutFailure } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
