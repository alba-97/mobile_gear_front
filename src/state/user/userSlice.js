import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userData: null,
  is_admin: false,
  cookie: {},
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
      state.is_admin = action.payload.is_admin;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
      state.is_admin = action.payload.is_admin;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.is_admin = false;
    },
    list: (state, action) => {
      state.users = action.payload;
    },
    setCookie: (state, action) => {
      state.cookie = action.payload;
    },
  },
});

export const { login, logout, register, list } = userSlice.actions;
export default userSlice.reducer;
