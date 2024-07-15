import { useState } from "react";
import { useDispatch } from "react-redux";
import http from "../http";
import { HttpStatusCode } from "axios";
import { setCategories } from "../context/bookSlice";

const useCategory = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const getCategorys = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.get("/api/v1/cate/userShow");
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setCategories(res.data.model));
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, getCategorys };
};
export default useCategory;
