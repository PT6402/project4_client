import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "../http";
import { HttpStatusCode } from "axios";
import { setCategories, setListBook } from "../context/bookSlice";

const useBook = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const bookStore = useSelector((state) => state.bookStore);

  const getFirstBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res_categories = await http.get("/api/v1/categories");
      if (res_categories.status == HttpStatusCode.Ok) {
        dispatch(setCategories(res_categories.data));
      }
      const res_books = await http.get("/api/v1/books?_page=1&_limit=5");
      if (res_books.status == HttpStatusCode.Ok) {
        dispatch(setListBook(res_books.data.data));
      }
      return;
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, getFirstBooks, bookStore };
};

export default useBook;
