import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    inforUser: {
      fullname: "",
      role: "",
      email: "",
      typeLogin: "",
      accessToken: "",
      userDetailId: null,
      isLoggedIn: false,
    },
    orderHistorys: [],
    myBooks: [],
    cart: {
      items: [],
    },

    wishlist: [],
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.inforUser.accessToken = action.payload;
    },
    setEmail: (state, action) => {
      state.inforUser.email = action.payload;
      state.inforUser.accessToken = "";
      state.inforUser.role = "";
      state.inforUser.fullname = "";
    },
    setInfor: (state, action) => {
      state.inforUser = action.payload;
    },
    setTypeLogin: (state, action) => {
      state.inforUser.typeLogin = action.payload;
    },
    setLogout: (state) => {
      state.inforUser = {
        fullname: "",
        role: "",
        email: "",
        typeLogin: "",
        accessToken: "",
        userDetailId: null,
        isLoggedIn: false,
      };
      state.wishlist = [];
      state.cart = {
        items: [],
      };
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
  setAccessToken,
  setEmail,
  setInfor,
  setTypeLogin,
  setWishlist,
  setCartItem,
  addCartItem,
  removeAll,
  deleteCartItem,
  setLogout,
} = userSlice.actions;
