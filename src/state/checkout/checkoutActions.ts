import axios, { isAxiosError } from "axios";
import {
  checkoutRequest,
  checkoutSuccess,
  checkoutFailure,
} from "./checkoutSlice";
import * as settings from "../../settings";
import getHeaders from "../../hooks/getHeaders";
import { Dispatch } from "redux";
import { CartState } from "../cart/cartSlice";

export const checkout =
  (cartItems: CartState[]) => async (dispatch: Dispatch) => {
    dispatch(checkoutRequest());
    try {
      await axios.post(
        `${settings.axiosURL}/orders/checkout`,
        {
          data: cartItems,
        },
        getHeaders()
      );
      await axios.post(`${settings.axiosURL}/orders/confirm`, {}, getHeaders());
      dispatch(checkoutSuccess());
    } catch (error) {
      if (isAxiosError(error)) dispatch(checkoutFailure(error.message));
    }
  };
