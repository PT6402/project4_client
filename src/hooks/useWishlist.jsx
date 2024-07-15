import { useState } from "react";
import { useDispatch } from "react-redux";
import http from "../http";
import { HttpStatusCode } from "axios";
import { setWishlist } from "../context/userSlice";

const useWishlist = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const getWishlist = async ({ userDetailId }) => {
    setIsLoading(true);
    setError(null);
    try {
      if (userDetailId) {
        const res = await http.get(`/api/v1/wishlist/show/${userDetailId}`);
        if (res.status == HttpStatusCode.Ok) {
          dispatch(setWishlist(res.data?.model));
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const addWishlist = async ({ bookId, userDetailId }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.post(
        `/api/v1/wishlist/create?bookid=${bookId}&userdetailid=${userDetailId}`
      );
      if (res.status == HttpStatusCode.Ok) {
        console.log("add success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteWishlist = async ({ wishlistId }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.delete(`/api/v1/wishlist/${wishlistId}`);
      if (res.status == HttpStatusCode.Ok) {
        console.log("delete success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { addWishlist, deleteWishlist, getWishlist, isLoading, error };
};

export default useWishlist;
