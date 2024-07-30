import { HttpStatusCode } from "axios";
import { useState } from "react";
import useHttp from "../auth/useHttp";
import { useDispatch } from "react-redux";
import { setTopLike } from "../../context/bookSlice";

const useTop = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const { http } = useHttp();
  const getTopLike = async () => {
    setIsLoading(true);
    try {
      const res = await http.get("/api/v1/statistics/toplike");
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setTopLike(res.data));
        return res.data;
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, getTopLike };
};
export default useTop;
