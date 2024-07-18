import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import authorSlice from './authorSlice';
import bookSlice from "./bookSlice";
import uiSlice from "./uiSlice";
import formSlice from "./formSlice";

const store = configureStore({
  reducer: {
    userStore: userSlice,
    bookStore: bookSlice,
    uiConfig: uiSlice,
    formStore: formSlice,
    authorStore: authorSlice,
    // categoryStore: categorySlice,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
