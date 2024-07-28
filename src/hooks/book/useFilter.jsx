import { useDispatch, useSelector } from "react-redux";
import { HttpStatusCode } from "axios";

import { useState } from "react";
import useHttp from "../auth/useHttp";
import { setListBook, setTotalPage } from "../../context/bookSlice";

const useFilter = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { http_auth } = useHttp();
  const authHttp = http_auth();

  const {
    collection: { currentPage, limit },
  } = useSelector((state) => state.bookStore);
  const filterBook = async ({ rating, categorys, from, to }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authHttp.post(
        `/api/v1/book/showpage?page=${currentPage}&limit=${limit}`,
        {
          list: categorys,
          rating: rating,
          from,
          to,
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
