import { useSelector } from "react-redux";
import Rating from "react-rating";
import IconStarEmpty from "../../icons/IconStarEmpty";
import IconStarFull from "../../icons/IconStarFull";

/* eslint-disable react/prop-types */
const Range = ({ handleChange, handleToggleStar }) => {
  const {
    filterBook: { rating: ratingStore },
  } = useSelector((state) => state.bookStore);

  return (
    <fieldset className="pb-4 border-b border-gray-500">
      <Rating
        emptySymbol={<IconStarEmpty />}
        fullSymbol={<IconStarFull />}
        onChange={(value) => handleChange(value)}
        onClick={(value) => handleToggleStar(value)}
        start={0}
        stop={5}
        step={1}
        initialRating={ratingStore}
      />
    </fieldset>
  );
};

export default Range;
