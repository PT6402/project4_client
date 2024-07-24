import { useState } from "react";
import { HttpStatusCode } from "axios";

import { useDispatch } from "react-redux";

import useHttp from "../auth/useHttp";
import { setCategories } from "../../context/bookSlice";

const useCategory = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const { http, http_auth } = useHttp();
  const authHttp = http_auth();
  const dispatch = useDispatch();
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

  const getCategoryById = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.get(`/api/v1/cate/${id}`);
      if (res.status === HttpStatusCode.Ok) {
        return res.data.model;
      } else {
        setError("Failed to fetch category");
        return null;
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch category");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authHttp.post("/api/v1/cate/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === HttpStatusCode.Ok) {
        await getCategories();
        return res.data.model;
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = async (id, formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authHttp.put(`/api/v1/cate/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === HttpStatusCode.Ok) {
        // Handle success, e.g., show success message or update state
        return res.data.status;
      }
    } catch (error) {
      console.log("Error response:", error.response);
      setError(error.response?.data?.message || "Failed to update category");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getCategories,
    createCategory,
    updateCategory,
    getCategoryById,
  };
};

export default useCategory;
