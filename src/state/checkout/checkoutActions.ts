import axios from "axios";
import * as settings from "../../settings";
import getHeaders from "../../hooks/getHeaders";
import { CartState } from "../cart/cartSlice";

export const checkout = async (cartItems: CartState[]) => {
  await axios.post(
    `${settings.axiosURL}/orders/checkout`,
    {
      data: cartItems,
    },
    getHeaders()
  );
  await axios.post(`${settings.axiosURL}/orders/confirm`, {}, getHeaders());
};
