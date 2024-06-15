import { createSlice } from "@reduxjs/toolkit";

const toastSlide = createSlice({
  name: "toastSlide",
  initialState: {
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    setSuccess: (state, action) => {
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
    },
    setError: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
    setClose: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    },
  },
});

export default toastSlide.reducer;
export const { setSuccess, setError, setClose } = toastSlide.actions;
