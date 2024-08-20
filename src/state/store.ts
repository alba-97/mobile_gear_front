import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import productsReducer from "./products/productsSlice";
import cartReducer from "./cart/cartSlice";
import checkoutReducer from "./checkout/checkoutSlice";
import ordersReducer from "./orders/ordersSlice";
import categoriesReducer from "./categories/categoriesSlice";
import filterReducer from "./filters/filterSlice";

export interface RootState {
  user: ReturnType<typeof userReducer>;
  products: ReturnType<typeof productsReducer>;
  cart: ReturnType<typeof cartReducer>;
  checkout: ReturnType<typeof checkoutReducer>;
  orders: ReturnType<typeof ordersReducer>;
  categories: ReturnType<typeof categoriesReducer>;
  filter: ReturnType<typeof filterReducer>;
}

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: ordersReducer,
    categories: categoriesReducer,
    filter: filterReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

export default store;
