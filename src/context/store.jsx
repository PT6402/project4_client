import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import toastSlide from "./toastSlide";

const store = configureStore({
  reducer: { userStore: userSlice, toastStore: toastSlide },
});

export default store;
