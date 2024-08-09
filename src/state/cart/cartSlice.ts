import { ICarts } from "@/interfaces/Cart";
import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  items: ICarts;
  totalPrice: number;
}

const initialState: CartState = {
  items: {},
  totalPrice: 0,
};

const persistedState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") ?? "{}")
  : initialState;

const cartSlice = createSlice({
  name: "cart",
  initialState: persistedState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items[newItem.id];
      if (!existingItem) {
        state.items[newItem.id] = {
          ...newItem,
        };
        state.totalPrice += newItem.price;
      } else {
        existingItem.quantity++;
        state.totalPrice += newItem.price;
      }
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items[id];
      if (existingItem) {
        state.totalPrice -= existingItem.price * existingItem.quantity;
        delete state.items[id];
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items[id];
      if (existingItem) {
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalPrice += quantityDifference * existingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = {};
      state.totalPrice = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
