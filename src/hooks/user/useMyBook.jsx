import { useState } from "react";
import { useDispatch } from "react-redux";
import useHttp from "../auth/useHttp";
import { HttpStatusCode } from "axios";
import { setMyBook } from "../../context/userSlice";

const useMyBook = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const { http_auth } = useHttp();
  const authHttp = http_auth();

  const getMyBook = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authHttp.get(`api/v1/mybook/show`);
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
