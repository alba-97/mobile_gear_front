import { UserResponse } from "@/interfaces/UserResponse";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  userData: UserResponse;
  isAdmin: boolean;
  cookie: {};
  users: UserResponse[];
}

const initialState: UserState = {
  isAuthenticated: false,
  userData: {
    id: null,
    email: "",
    username: "",
    isAdmin: false,
  },
  isAdmin: false,
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
      state.isAdmin = action.payload.isAdmin;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = initialState.userData;
      state.isAdmin = false;
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
