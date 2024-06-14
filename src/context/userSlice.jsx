import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    inforUser: {
      fullname: null,
      role: null,
      email: null,
      typeLogin: null,
      accessToken: null,
    },
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.inforUser.accessToken = action.payload;
    },
    setEmail: (state, action) => {
      state.inforUser.email = action.payload;
      state.inforUser.accessToken = "";
      state.inforUser.role = "";
      state.inforUser.fullname = "";
    },
    setInfor: (state, action) => {
      state.inforUser = action.payload;
    },
    setTypeLogin: (state, action) => {
      state.inforUser.typeLogin = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setAccessToken, setEmail, setInfor, setTypeLogin } =
  userSlice.actions;
