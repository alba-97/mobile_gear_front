import axios from "axios";
axios.defaults.withCredentials = true;
import { login, logout, register, list } from "./userSlice";
import * as settings from "../../settings";
import getHeaders from "../../hooks/getHeaders";

export const registerUser = (username, email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${settings.axiosURL}/users/signup`, {
      username,
      email,
      password,
    });

    const userData = response.data;
    dispatch(register(userData));
  } catch (error) {
    console.error("Register error:", error);
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(`${settings.axiosURL}/users/login`, {
      email,
      password,
    });

    const { token, user } = res.data;
    localStorage.setItem(token);
    await dispatch(login(user));
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post(`${settings.axiosURL}/users/logout`);
    localStorage.clear();
    dispatch(logout());
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${settings.axiosURL}/admin/users`,
      getHeaders()
    );
    dispatch(list(response.data));
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
