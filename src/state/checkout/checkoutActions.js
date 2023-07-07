import axios from "axios";
import {
  checkoutRequest,
  checkoutSuccess,
  checkoutFailure,
} from "./checkoutSlice";
import * as settings from "../../settings";

export const checkout = (cartItems) => async (dispatch) => {
  dispatch(checkoutRequest());
  try {
    await axios.post(`${settings.axiosURL}/orders/checkout`, {
      data: cartItems,
    });
    await axios.post(`${settings.axiosURL}/orders/confirm`);
    dispatch(checkoutSuccess());
  } catch (error) {
    dispatch(checkoutFailure(error.message));
  }
};
