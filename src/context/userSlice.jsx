import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    infoUser: {
      firstName: null,
      lastName: null,
      role: null,
      email: null,
      accessToken: null,
    },
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.infoUser.accessToken = action.payload;
    },
    setEmail: (state, action) => {
      state.infoUser.email = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setAccessToken, setEmail } = userSlice.actions;
