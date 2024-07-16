import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "../http";
import { HttpStatusCode } from "axios";
import {
  setCurrentPage,
  setListBook,
  setTotalPage,
} from "../context/bookSlice";

const useBook = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
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
      } else {
        const res = await http.get(
          `/api/v1/authors/search?name=${querySearch}`
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
      const res = await http.get(`http://localhost:9090/api/v1/authors`);
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

  return { isLoading, error, getBooks, getBookDetail, search, getAuthors };
};

export default useBook;
