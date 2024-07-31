import { useState } from "react";
import useHttp from "../auth/useHttp";
import { HttpStatusCode } from "axios";
import { useDispatch } from "react-redux";
import {
  createReviewInOrderHistory,
  updateReviewInOrderHistory,
} from "../../context/userSlice";

const useReview = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const { http_auth } = useHttp();
  const authHttp = http_auth();
  const createReview = async ({ rating, content, bookId, orderId }) => {
    setIsLoading(true);
    try {
      const res = await authHttp.post("/api/v1/reviews", {
        rating,
        content,
        bookId,
      });
      if (res.status == HttpStatusCode.Ok) {
        const data = res.data.model;
        dispatch(
          createReviewInOrderHistory({
            updateOrderId: orderId,
            updateBookId: bookId,
            rating,
            comment: content,
            id: data.id,
          })
        );
        return res.data.message;
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const updateReview = async ({
    rating,
    content,
    reviewId,
    orderId,
    bookId,
  }) => {
    setIsLoading(true);
    try {
      const res = await authHttp.put("/api/v1/reviews", {
        id: reviewId,
        content,
        rating,
      });
      if (res.status == HttpStatusCode.Ok) {
        dispatch(
          updateReviewInOrderHistory({
            updateOrderId: orderId,
            updateBookId: bookId,
            rating,
            comment: content,
          })
        );
        return res.data.message;
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, createReview, updateReview };
};
export default useReview;
