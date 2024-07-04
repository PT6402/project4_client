import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "userSlice",
  initialState: {
    listBooks: [],
    categories: [],
    selectedBook: {
      bookId: "",
      nameBook: "",
      price: "",
      pageQuatity: null,
      rating: null,
      ratingQuantity: null,
      description: "",
      edition: "",
      authors: [{ authorId: null, authorName: "" }],
      images: "",
      categories: [{ id: "", name: "", thumbnail: "", description: "" }],
      page: null,
      isBestSeller: null,
      reviews: [
        {
          userId: null,
          content: "",
          rating: null,
          userName: null,
          dateReview: null,
        },
      ],
    },
  },

  reducers: {
    setInforBook: (state, action) => {
      state.selectedBook = action.payload;
    },

    setListBook: (state, action) => {
      state.listBooks = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export default bookSlice.reducer;
export const { setInforBook, setListBook, setCategories } = bookSlice.actions;
