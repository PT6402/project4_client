import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    adminSidenav: false,
    adminFixnav: true,
  },
  reducers: {
    setUIAdminSidenav: (state, action) => {
      state.adminSidenav = action.payload;
    },
    setUIAdminFixnav: (state, action) => {
      state.adminFixnav = action.payload;
    },
  },
});

export default uiSlice.reducer;
export const { setUIAdminSidenav, setFixnav } = uiSlice.actions;
