import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HttpStatusCode } from "axios";

import useHttp from "../auth/useHttp";
import {
  setCurrentPage,
  setListBook,
  setTotalPage,
} from "../../context/bookSlice";
import { setOrderHistory } from "../../context/userSlice";

const useBook = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const { http, http_auth } = useHttp();
  const authHttp = http_auth();
  const {
    collection: { currentPage, limit },
  } = useSelector((state) => state.bookStore);
  const getBooks = async ({ goToPage = currentPage }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.get(
        `/api/v1/book/showpage?page=${goToPage}&limit=${limit}`
      );
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setCurrentPage(goToPage));
        dispatch(setTotalPage(res.data?.model?.totalPage));
        dispatch(setListBook(res.data?.model?.paglist));
        return res.data?.model?.paglist;
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  const getBookDetail = async ({ id }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.get(`/api/v1/book/showone/${id}`);
      if (res.status == HttpStatusCode.Ok) {
        return res.data.model;
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const search = async ({ searchBy, querySearch }) => {
    setIsLoading(true);
    setError(null);
    try {
      if (searchBy == "book") {
        const res = await http.get(`/api/v1/book/search?name=${querySearch}`);
        if (res.status == HttpStatusCode.Ok) {
          return res.data.model;
        }
      } else if (searchBy == "author") {
        const res = await http.get(
          `/api/v1/authors/search?name=${querySearch}`
        );
        if (res.status == HttpStatusCode.Ok) {
          return res.data.model;
        }
      } else {
        const res = await http.get(
          `/api/v1/publisher/search?name=${querySearch}`
        );
        if (res.status == HttpStatusCode.Ok) {
          return res.data.model;
        }
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  const getAuthors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.get(`api/v1/authors`);
      if (res.status == HttpStatusCode.Ok) {
        return res.data.model;
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  const getOrder = async (accessToken) => {
    setIsLoading(true);
    setError(null);
    try {
      // const res = await authHttp.get(`/api/v1/orders`);
      let res;
      if (!accessToken) {
        res = await authHttp.get("/api/v1/orders");
      } else {
        res = await http.get("/api/v1/orders", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setOrderHistory(res.data.model));
        return res.data.model;
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  const getPublisher = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.get(`/api/v1/publisher/`);
      if (res.status == HttpStatusCode.Ok) {
        return res.data.model;
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getBooks,
    getPublisher,
    getBookDetail,
    search,
    getAuthors,
    getOrder,
  };
};

export default useBook;
