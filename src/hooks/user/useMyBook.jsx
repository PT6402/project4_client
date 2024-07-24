import { useState } from "react";
import { useDispatch } from "react-redux";
import useHttp from "../auth/useHttp";
import { HttpStatusCode } from "axios";
import { setMyBook } from "../../context/userSlice";

const useMyBook = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const { http_auth, http } = useHttp();
  const authHttp = http_auth();

  const getMyBook = async (accessToken) => {
    setIsLoading(true);
    setError(null);
    try {
      let res;
      if (!accessToken) {
        res = await authHttp.get("api/v1/mybook");
      } else {
        res = await http.get("api/v1/mybook", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setMyBook(res.data.model));
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, getMyBook };
};
export default useMyBook;
