import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "bookSlice",
  initialState: {
    authors: [],
    topLike: [],
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
      rating: null,
      from: null,
      to: null,
    },
  },

  reducers: {
    setListAuthor: (state, action) => {
      state.authors = action.payload;
    },
    setTopLike: (state, action) => {
      state.topLike = action.payload;
    },
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
    setFilterCategorys: (state, action) => {
      state.filterBook.categorys = action.payload;
    },
    setFilterRating: (state, action) => {
      state.filterBook.isFilter = true;
      state.filterBook.rating = action.payload;
    },
    setPrice: (state, action) => {
      state.filterBook.isFilter = true;
      state.filterBook.from = action.payload.from;
      state.filterBook.to = action.payload.to;
    },
    clearFilter: (state) => {
      state.filterBook = {
        isFilter: false,
        categorys: [],
        rating: null,
        from: null,
        to: null,
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
  setListAuthor,
  setFilterCate,
  clearFilter,
  setCategories,
  setFilterRating,
  setListBook,
  setTotalPage,
  setCurrentPage,
  refreshCollection,
  setFilterCategorys,
  setPrice,
  setTopLike,
} = bookSlice.actions;
