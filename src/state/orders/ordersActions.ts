import axios, { isAxiosError } from "axios";
import { setOrders, setLoading, setError } from "./ordersSlice";
import * as settings from "../../settings";
import getHeaders from "../../hooks/getHeaders";
import { Dispatch } from "@reduxjs/toolkit";

export const fetchOrders = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(
      `${settings.axiosURL}/orders`,
      getHeaders()
    );
    dispatch(setOrders(response.data));
  } catch (error) {
    if (isAxiosError(error)) dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
