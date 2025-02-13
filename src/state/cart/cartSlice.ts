import { ICart } from "@/interfaces/Cart";
import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  items: ICart[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item: ICart) => item.id === newItem.id
      );
      if (!existingItem) {
        let newItems = [...state.items];
        newItems.push(newItem);
        state.totalPrice += newItem.price;
        state.items = newItems;
      } else {
        existingItem.qty++;
        state.totalPrice += newItem.price;
      }
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item: ICart) => item.id === id);
      if (existingItem) {
        state.totalPrice -= existingItem.price * existingItem.qty;
        delete state.items[id];
      }
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const existingItem = state.items.find((item: ICart) => item.id === id);
      if (existingItem) {
        const quantityDifference = qty - existingItem.qty;
        existingItem.qty = qty;
        state.totalPrice += quantityDifference * existingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
