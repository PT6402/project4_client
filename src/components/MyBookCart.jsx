import Rating from "react-rating";
import InputForm from "./InputForm";
import IconStarEmpty from "./icons/IconStarEmpty";
import IconStarFull from "./icons/IconStarFull";
import { Button } from "@material-tailwind/react";

/* eslint-disable react/prop-types */
const MyBookCard = ({ book, handleReadBook }) => {
  const {
    bookId,
    price,
    bookname,
    bookid,
    mybookid,
    status,
    expiredDate,
    days,
    fileImage,
  } = book;
  return (
    <div
      id={bookId}
      className="flex flex-col justify-between p-6 border-b border-gray-700 sm:flex-row hover:rounded-lg hover:bg-gray-800 sm:justify-start"
    >
      <img
        className="self-center w-32 h-48 sm:h-40 sm:w-18"
        src={`data:image/png;base64,${fileImage}`}
        alt={bookname}
      />
      <div className="flex flex-col items-center sm:items-start sm:flex-row sm:ml-4 sm:w-full sm:justify-between">
        <div className="flex flex-col items-center justify-between mt-5 sm:items-start align-center sm:mt-0">
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-lg font-bold text-gray-100 lg:text-xl">
              {bookname}
            </h2>
            {/* <p className="mt-1 text-xs text-gray-200 sm:text-sm">{authors}</p> */}
          </div>
          {/* <div className="flex flex-row items-center mt-4 space-x-4 text-gray-100">
            <p className="text-xs before:mr-1 before:content-['$'] line-through text-gray-200">
              {price}
            </p>
          </div> */}
          <Button variant="filled" color="cyan" onClick={handleReadBook}>
            Read book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyBookCard;
