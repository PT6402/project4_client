import { useDispatch, useSelector } from "react-redux";
import { refreshCollection, setFilterRating } from "../../../context/bookSlice";
import { useFilter } from "../../../hooks";
import { useEffect, useRef, useState } from "react";
import Rating from "react-rating";
import IconStarEmpty from "../../icons/IconStarEmpty";
import IconStarFull from "../../icons/IconStarFull";

/* eslint-disable react/prop-types */
const Range = () => {
  const dispatch = useDispatch();
  const {
    filterBook: { categorys, isFilter, rating: ratingStore },
  } = useSelector((state) => state.bookStore);
  const { filterBook } = useFilter();
  const handleChange = async (value) => {
    dispatch(setFilterRating(value));
    if (!isFilter) {
      dispatch(refreshCollection());
    }
    await filterBook({ rating: value, categorys });
  };
  return (
    <fieldset className="pb-4 border-b border-gray-500">
      <Rating
        emptySymbol={<IconStarEmpty />}
        fullSymbol={<IconStarFull />}
        onChange={(value) => {
          handleChange(value);
        }}
        start={0}
        stop={5}
        step={1}
        initialRating={ratingStore}
      />
    </fieldset>
  );
};

export default Range;
