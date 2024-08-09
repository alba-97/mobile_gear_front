import { createSlice } from "@reduxjs/toolkit";

interface CheckoutState {
  loading: boolean;
  error: string | null;
  completed: boolean;
}

const initialState: CheckoutState = {
  loading: false,
  completed: false,
  error: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
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
