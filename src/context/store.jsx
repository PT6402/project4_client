import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import authorSlice from "./authorSlice";
import bookSlice from "./bookSlice";
import uiSlice from "./uiSlice";
import formSlice from "./formSlice";
import readBookSlice from "./readBookSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    userStore: userSlice,
    bookStore: bookSlice,
    uiConfig: uiSlice,
    formStore: formSlice,
    authorStore: authorSlice,
    readBook: readBookSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
