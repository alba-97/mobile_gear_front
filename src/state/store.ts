import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import productsReducer from "./products/productsSlice";
import cartReducer from "./cart/cartSlice";
import checkoutReducer from "./checkout/checkoutSlice";
import ordersReducer from "./orders/ordersSlice";
import categoriesReducer from "./categories/categoriesSlice";
import filterReducer from "./filters/filterSlice";

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
