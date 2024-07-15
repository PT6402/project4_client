import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "bookSlice",
  initialState: {
    listBook: [],
    collection: {
      totalPage: 0,
      currentPage: 1,
      limit: 10,
    },
    categories: [],
    filterBook: {
      isFilter: false,
      categorys: [],
      rating: 0,
    },
  },

  reducers: {
    setCurrentPage: (state, action) => {
      state.collection.currentPage = action.payload;
    },
    setTotalPage: (state, action) => {
      state.collection.totalPage = action.payload;
    },
    setListBook: (state, action) => {
      state.listBook = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setFilterCate: (state, action) => {
      const listCateSelected = [...state.filterBook.categorys];
      let newListCateSelected = [];
      if (listCateSelected.includes(action.payload)) {
        newListCateSelected = listCateSelected.filter(
          (i) => i != action.payload
        );
      } else {
        newListCateSelected = [...listCateSelected, action.payload];
      }
      state.filterBook.isFilter = true;
      state.filterBook.categorys = newListCateSelected;
    },
    setFilterRating: (state, action) => {
      state.filterBook.isFilter = true;
      state.filterBook.rating = action.payload;
    },
    clearFilter: (state) => {
      state.filterBook = {
        isFilter: false,
        categorys: [],
        rating: 0,
      };
    },
    refreshCollection: (state) => {
      state.collection = {
        totalPage: 0,
        currentPage: 1,
        limit: 10,
      };
    },
  },
});

export default bookSlice.reducer;
export const {
  setFilterCate,
  clearFilter,
  setCategories,
  setFilterRating,
  setListBook,
  setTotalPage,
  setCurrentPage,
  refreshCollection,
} = bookSlice.actions;
