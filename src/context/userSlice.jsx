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
      state.cart = action.payload;
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

    setOrderHistory: (state, action) => {
      state.orderHistorys = action.payload;
    },

    updateReviewInOrderHistory: (state, action) => {
      const { updateOrderId, updateBookId, rating, comment } = action.payload;
      const copyOrders = [...state.orderHistorys];
      const review = copyOrders
        .find(({ orderId }) => orderId == updateOrderId)
        .orderDetails.find(({ bookId }) => bookId == updateBookId).review;
      review.star = rating;
      review.content = comment;
      state.orderHistorys = copyOrders;
    },
    createReviewInOrderHistory: (state, action) => {
      const { updateOrderId, updateBookId, rating, comment, id } =
        action.payload;
      const copyOrders = [...state.orderHistorys];
      copyOrders
        .find(({ orderId }) => orderId == updateOrderId)
        .orderDetails.find(({ bookId }) => bookId == updateBookId).review = {
        id,
        star: rating,
        content: comment,
      };
      state.orderHistorys = copyOrders;
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
  setOrderHistory,
  createReviewInOrderHistory,
  updateReviewInOrderHistory,
} = userSlice.actions;
