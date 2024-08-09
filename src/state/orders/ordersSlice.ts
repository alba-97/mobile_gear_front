import { Order } from "@/interfaces/Order";
import { createSlice } from "@reduxjs/toolkit";

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setOrders, setLoading, setError } = ordersSlice.actions;
export default ordersSlice.reducer;
