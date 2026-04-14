import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("currentUser")) || null,
  isAuthenticated: !!localStorage.getItem("currentUser"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerAndLogin: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { registerAndLogin, logout } = authSlice.actions;
export default authSlice.reducer;
