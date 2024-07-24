import { useState } from "react";
import { useDispatch } from "react-redux";
import { HttpStatusCode } from "axios";
import { setWishlist } from "../../context/userSlice";
import useHttp from "../auth/useHttp";

const useWishlist = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const { http_auth, http } = useHttp();
  const authHttp = http_auth();
  const getWishlist = async (accessToken) => {
    setIsLoading(true);
    setError(null);
    try {
      let res;
      if (!accessToken) {
        res = await authHttp.get("/api/v1/wishlist");
      } else {
        res = await http.get("api/v1/wishlist", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setWishlist(res.data?.model));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const addWishlist = async ({ bookId }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authHttp.post(`/api/v1/wishlist?bookid=${bookId}`);
      if (res.status == HttpStatusCode.Ok) {
        console.log("add success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteWishlist = async ({ bookId }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authHttp.delete(`/api/v1/wishlist/${bookId}`);
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
