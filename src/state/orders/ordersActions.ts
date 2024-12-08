import axios from "axios";
import * as settings from "../../settings";
import getHeaders from "../../hooks/getHeaders";

export const fetchOrders = async () => {
  const { data } = await axios.get(`${settings.axiosURL}/orders`, getHeaders());
  return data;
};
