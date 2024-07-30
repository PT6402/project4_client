import { useState } from "react";
import useHttp from "../auth/useHttp";
import { HttpStatusCode } from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setAppendPage,
  setInitReadBookInfor,
  setLoading,
  setPage,
  setTotalReadPage,
} from "../../context/readBookSlice";

const useReadBook = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const { listPage, bookCurrentId: bookId } = useSelector(
    (state) => state.readBook
  );
  const { http_auth } = useHttp();
  const authHttp = http_auth();
  const getReadBook = async (bookId) => {
    setIsLoading(true);
    try {
      const res = await authHttp.get(`api/v1/read/${bookId}`);
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setInitReadBookInfor({ bookId }));
        dispatch(setTotalReadPage(res.data.model.totalPage));
        dispatch(setPage(res.data.model.list));
        return res.data.model.list;
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getReadAppendBook = async () => {
    dispatch(setLoading(true));
    try {
      const res = await authHttp.get(
        `api/v1/read/${bookId}/${listPage.length}`
      );
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setInitReadBookInfor({ bookId }));
        dispatch(setAppendPage(res.data.model.list));
        return res.data.model.list;
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return { getReadBook, isLoading, error, getReadAppendBook };
};
export default useReadBook;
