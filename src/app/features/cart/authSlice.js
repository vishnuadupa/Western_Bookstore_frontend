// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isAdmin:false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
