/* eslint-disable react/prop-types */
import Rating from "react-rating";
import IconStarEmpty from "./icons/IconStarEmpty";
import IconStarFull from "./icons/IconStarFull";
import { useEffect, useState } from "react";
import useReview from "../hooks/user/useReview";

export default function ReviewComponent({ orderDetailItem, orderId }) {
  const [isReviewed, setIsReviewed] = useState(false);
  const { bookId, review } = orderDetailItem;
  const [comment, setComment] = useState(() => {
    if (review != null) {
      return review.content;
    } else {
      return "";
    }
  });
  const [rating, setRating] = useState(() => {
    if (review != null) {
      return review.star;
    } else {
      return 0;
    }
  });
  const [load, setLoad] = useState(false);
  const { isLoading, createReview, updateReview } = useReview();
  const handleSubmit = async () => {
    if (isReviewed) {
      await updateReview({
        reviewId: review.id,
        content: comment,
        rating,
        bookId,
        orderId,
      });
    } else {
      await createReview({ bookId, content: comment, rating, orderId });
    }
  };
  useEffect(() => {
    if (review != null) {
      setIsReviewed(true);
    } else {
      setIsReviewed(false);
    }
  }, [isLoading]);
  useEffect(() => {
    if (isLoading) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }, [isLoading]);
  return (
    <div>
      <div className="w-fit">
        <Rating
          emptySymbol={<IconStarEmpty />}
          fullSymbol={<IconStarFull />}
          onChange={(value) => setRating(value)}
          // onClick={(value) => handleToggleStar(value)}
          start={0}
          stop={5}
          step={1}
          initialRating={rating}
        />
      </div>
      <textarea
        id="message"
        rows="4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="block p-2.5 w-full text-sm placeholder:text-gray-800 text-gray-800 bg-gray-400 rounded-lg border border-transparent ring-0 outline-transparent focus:ring-0 focus:ring-transparent focus:border-transparent"
        placeholder="Write your thoughts here..."
      ></textarea>
      <button
        className=" mt-1 w-fit px-5 py-2.5 text-xs lg:text-sm font-medium text-center text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
        onClick={handleSubmit}
      >
        {load ? "loading..." : isReviewed ? "Update" : "Submit"}
      </button>
    </div>
  );
}
