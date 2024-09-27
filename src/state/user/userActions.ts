import axios from "axios";
axios.defaults.withCredentials = true;
import { login, logout, register, list } from "./userSlice";
import * as settings from "../../settings";
import getHeaders from "../../hooks/getHeaders";
import { Dispatch } from "@reduxjs/toolkit";
import { User } from "@/interfaces/User";

export const registerUser =
  (username: string, email: string, password: string) =>
  async (dispatch: Dispatch) => {
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

export const loginUser =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.post(`${settings.axiosURL}/users/login`, {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("jwt", token);
      await dispatch(login(user));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

export const refreshUser = (user: User) => async (dispatch: Dispatch) => {
  try {
    await dispatch(login(user));
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    await axios.post(`${settings.axiosURL}/users/logout`);
    localStorage.clear();
    dispatch(logout());
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const fetchUsers = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(
      `${settings.axiosURL}/users`,
      getHeaders()
    );
    dispatch(list(response.data));
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
