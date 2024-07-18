import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "../http";
import { HttpStatusCode } from "axios";
import { setCartItem } from "../context/userSlice";

const useCart = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const {
    inforUser: { isLoggedIn, userDetailId },
  } = useSelector((state) => state.userStore);

  const addToCart = async ({ bookId, iBuy, packageId }) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!isLoggedIn) {
        throw Error("not user current");
      }
      const res = await http.post(`/api/v1/cart/add/${userDetailId}`, {
        bookId,
        packId: packageId,
        ibuy: iBuy,
      });
      if (res.status == HttpStatusCode.Ok) {
        await getCart();
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteToCart = async ({ bookId }) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!isLoggedIn) {
        throw Error("not user current");
      }
      const res = await http.delete(
        `/api/v1/cart/remove/${userDetailId}/${bookId}`
      );
      if (res.status == HttpStatusCode.Ok) {
        await getCart();
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getCart = async (userId = userDetailId) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!isLoggedIn && userId == null) {
        throw Error("not user current");
      }
      const res = await http.get(`/api/v1/cart/view?userId=${userId}`);
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setCartItem(res.data.model));
        return res.data.model;
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const updateCart = async ({ cartItemId, packId }) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!isLoggedIn && userDetailId == null) {
        throw Error("not user current");
      }
      const res = await http.put(`/api/v1/cart/update`, {
        cartItemId,
        packId,
      });
      if (res.status == HttpStatusCode.Ok) {
        await getCart();
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, addToCart, getCart, deleteToCart, updateCart };
};

export default useCart;
