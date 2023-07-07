import axios from "axios";
import {
  checkoutRequest,
  checkoutSuccess,
  checkoutFailure,
} from "./checkoutSlice";
import * as settings from "../../settings";
import getHeaders from "../../hooks/getHeaders";

export const checkout = (cartItems) => async (dispatch) => {
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
    dispatch(checkoutFailure(error.message));
  }
};
