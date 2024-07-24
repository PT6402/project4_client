import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    inforUser: {
      email: null,
      fullname: null,
      role: "user",
    },
    cart: [],
    myBooks: [],
    wishlist: [],
    orderHistorys: [],
  },
  reducers: {
    setEmail: (state, action) => {
      state.inforUser.email = action.payload;
      state.inforUser.role = "";
      state.inforUser.fullname = "";
    },
    setInfor: (state, action) => {
      state.inforUser = action.payload;
    },
    setMyBook: (state, action) => {
      state.myBooks = action.payload;
    },
    clearUser: (state) => {
      state.inforUser = {
        fullname: null,
        role: "user",
        email: null,
      };
      state.wishlist = [];
      state.cart = [];
      state.myBooks = [];
      state.orderHistorys = [];
    },

    // cart
    addCartItem: (state, action) => {
      const copyItems = [...state.items];
      copyItems.push(action.payload);
      state.items = copyItems;
    },
    deleteCartItem: (state, action) => {
      const copyItems = [...state.items];
      const newItems = copyItems.filter(
        ({ bookId }) => action.payload != bookId
      );
      state.items = newItems;
    },
    removeAllCart: (state) => {
      state.items = [];
    },
    setCartItem: (state, action) => {
      state.cart.items = action.payload;
    },

    // wishlist
    addWishlistItem: (state, action) => {
      const copyItems = [...state.items];
      copyItems.push(action.payload);
      state.items = copyItems;
    },
    deleteWishlistItem: (state, action) => {
      const copyItems = [...state.items];
      const newItems = copyItems.filter(
        ({ bookId }) => action.payload != bookId
      );
      state.items = newItems;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
  },
});

export default userSlice.reducer;
export const {
  setEmail,
  setInfor,
  setMyBook,

  setWishlist,
  setCartItem,
  addCartItem,
  removeAll,
  deleteCartItem,
  clearUser,
} = userSlice.actions;
