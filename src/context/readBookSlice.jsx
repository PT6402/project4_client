import { createSlice } from "@reduxjs/toolkit";

const readBookSlice = createSlice({
  name: "readBookSlice",
  initialState: {
    isLoading: false,
    bookCurrentId: null,
    currentPage: 1,
    listPage: [],
  },
  reducers: {
    setPage: (state, action) => {
      state.listPage = action.payload;
    },
    setAppendPage: (state, action) => {
      const listPageOld = state.listPage;
      const listPageNew = [...listPageOld, ...action.payload];
      state.listPage = listPageNew;
    },
    setInitReadBookInfor: (state, action) => {
      state.currentPage = 1;
      state.bookCurrentId = action.payload.bookId;
    },
    clearReadBook: (state) => {
      state.listPage = [];
      state.currentPage = 1;
      state.currentPage = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default readBookSlice.reducer;
export const {
  setPage,
  setAppendPage,
  setInitReadBookInfor,
  clearReadBook,
  setLoading,
} = readBookSlice.actions;
