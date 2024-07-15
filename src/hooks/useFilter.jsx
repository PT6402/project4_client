import { useDispatch, useSelector } from "react-redux";
import http from "../http";
import { HttpStatusCode } from "axios";
import { setListBook, setTotalPage } from "../context/bookSlice";

const useFilter = () => {
  const dispatch = useDispatch();
  const {
    collection: { currentPage, limit },
  } = useSelector((state) => state.bookStore);
  const filterBook = async ({ rating, categorys }) => {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearFilter = () => {
    console.log("hello");
    dispatch(clearFilter());
  };

  return { clearFilter, filterBook };
};

export default useFilter;
