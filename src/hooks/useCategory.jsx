import { useState } from "react";
import http from "../http";
import { HttpStatusCode } from "axios";
import { useDispatch } from "react-redux";
import { setCategories } from "../context/bookSlice";

const useCategory = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const getCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.get("/api/v1/cate/userShow");
      if (res.status === HttpStatusCode.Ok) {
        dispatch(setCategories(res.data.model));
        return res.data.model;
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.post("/api/v1/cate/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === HttpStatusCode.Ok) {
        return res.data.model;
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, getCategories, createCategory };
};

export default useCategory;
