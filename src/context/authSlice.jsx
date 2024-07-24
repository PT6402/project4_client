import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    accessToken: null,
    isLoggedIn: false,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.isLoggedIn = false;
    },
  },
});
export default authSlice.reducer;
export const { setAccessToken, setLogin, clearAuth } = authSlice.actions;
