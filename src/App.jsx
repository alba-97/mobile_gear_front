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
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import * as settings from "../src/settings";
import { login } from "./state/user/userSlice";
import { fetchProducts } from "./state/products/productsActions";
import { useDispatch } from "react-redux";
import getHeaders from "./hooks/getHeaders";

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const is_admin = useSelector((state) => state.user.is_admin);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {" "}
      <Helmet>
        <title>Mobilegear</title>
      </Helmet>
      <BrowserRouter>
        <Box width="100%">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/history" element={<History />} />
            <Route path="/products" element={<Home />} />
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
