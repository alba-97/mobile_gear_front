import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import checkoutReducer from "./slices/checkoutSlice";

const persistedCheckoutState = localStorage.getItem("checkoutState");
const persistedAuthState = localStorage.getItem("authState");

const preloadedState = {
  checkout: persistedCheckoutState ? JSON.parse(persistedCheckoutState) : {},
  auth: persistedAuthState ? JSON.parse(persistedAuthState) : {},
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    orders: orderReducer,
    checkout: checkoutReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
