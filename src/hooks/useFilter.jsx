import { useDispatch, useSelector } from "react-redux";
import http from "../http";
import { HttpStatusCode } from "axios";
import { setListBook, setTotalPage } from "../context/bookSlice";

import { useState } from "react";

const useFilter = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const {
    collection: { currentPage, limit },
  } = useSelector((state) => state.bookStore);
  const filterBook = async ({ rating, categorys }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await http.post(
        `/api/v1/book/showpage?page=${currentPage}&limit=${limit}`,
        {
          list: categorys,
          rating: rating,
        }
      );
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setTotalPage(res.data?.model?.totalPage));
        dispatch(setListBook(res.data?.model?.paglist));
        return res.data?.model?.paglist;
      }
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { filterBook, loading, error };
};

export default useFilter;
