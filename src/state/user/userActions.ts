import axios from "axios";
import { list } from "./userSlice";
import * as settings from "../../settings";
import getHeaders from "../../hooks/getHeaders";
import { Dispatch } from "@reduxjs/toolkit";

axios.defaults.withCredentials = true;

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const { data } = await axios.post(`${settings.axiosURL}/users/signup`, {
    username,
    email,
    password,
  });

  return data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${settings.axiosURL}/users/login`, {
    email,
    password,
  });
  const { token, user } = res.data;
  return { token, user };
};

export const fetchUsers = async () => {
  const { data } = await axios.get(`${settings.axiosURL}/users`, getHeaders());
  return data;
};

export const handleSwitch = async (id: number) => {
  await axios.put(`${settings.axiosURL}/users/${id}`, {}, getHeaders());
  fetchUsers();
};
