import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { setCartItem } from "../../context/userSlice";
import useHttp from "../auth/useHttp";

const useCart = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { http_auth, http } = useHttp();
  const authHttp = http_auth();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const addToCart = async ({ bookId, iBuy, packageId }) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!isLoggedIn) {
        throw Error("not user current");
      }
      const res = await authHttp.post(`/api/v1/cart`, {
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
      const res = await authHttp.delete(`/api/v1/cart/${bookId}`);
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
  const getCart = async (accessToken) => {
    setIsLoading(true);
    setError(null);
    try {
      let res;
      if (!accessToken) {
        res = await authHttp.get("/api/v1/cart");
      } else {
        res = await http.get("api/v1/cart", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
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
      if (!isLoggedIn) {
        throw Error("not user current");
      }
      const res = await authHttp.put(`/api/v1/cart`, {
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
