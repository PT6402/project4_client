import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "../http";
import { HttpStatusCode } from "axios";
import { setWishlist } from "../context/userSlice";

const useWishlist = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const {
    inforUser: { userDetailId },
  } = useSelector((state) => state.userStore);

  const getWishlist = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.get(`/api/v1/wishlist/show/${userDetailId}`);
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setWishlist(res.data?.model));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const addWishlist = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.get(`/api/v1/wishlist/show/${userDetailId}`);
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setWishlist(res.data?.model));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteWishlist = () => {};
  return { addWishlist, deleteWishlist, getWishlist, isLoading, error };
};

export default useWishlist;
