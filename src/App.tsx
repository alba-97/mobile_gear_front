import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home/Home";
import { ProductDetail } from "./components/Product/ProductDetail";
import { Cart } from "./components/Cart/Cart";
import { Checkout } from "./components/Checkout";
import { OrderHistory } from "./components/OrderHistory";
import { Admin } from "./components/Admin/Admin";
import { History } from "./components/History";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as settings from "./settings";
import { fetchProducts } from "./state/products/productsActions";
import getHeaders from "./hooks/getHeaders";
import { RootState } from "./state/store";
import { login } from "./state/user/userSlice";
import {
  setError,
  setLoading,
  setProducts,
} from "./state/products/productsSlice";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const is_admin = useSelector((state: RootState) => state.user.is_admin);

  useEffect(() => {
    async function fetchUser() {
      const user = await axios.get(
        `${settings.axiosURL}/users/me`,
        getHeaders()
      );
      await dispatch(login(user.data));
    }
    fetchUser();
  }, []);

  const dispatch = useDispatch();

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      const products = await fetchProducts();
      dispatch(setProducts(products));
      dispatch(setLoading(false));
    } catch (error) {
      if (error instanceof Error) dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const productGridRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Helmet>
        <title>Mobilegear</title>
      </Helmet>
      <BrowserRouter>
        <Box width="100%">
          <Navbar productGridRef={productGridRef} />
          <Routes>
            <Route
              path="/"
              element={<Home productGridRef={productGridRef} />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/history" element={<History />} />
            <Route
              path="/products"
              element={<Home productGridRef={productGridRef} />}
            />
            <Route path="/products/:id" element={<ProductDetail />} />
            {isAuthenticated && (
              <>
                <Route path="/cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="/order-history" element={<OrderHistory />} />
              </>
            )}
            {is_admin && (
              <>
                <Route path="/admin" element={<Admin />} />
              </>
            )}
          </Routes>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
