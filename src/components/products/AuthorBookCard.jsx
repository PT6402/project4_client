/* eslint-disable react/prop-types */
import { TrashIcon } from "@heroicons/react/24/outline";
import WishlistButton from "../WishlistButton";
import { useNavigate } from "react-router-dom";
const AuthorBookCard = ({ product }) => {
  const { bookId, image, price, nameBook } = product;
  const navigate = useNavigate();
  return (
    <div
      id={bookId}
      className="bg-gray-600 rounded-md flex flex-col justify-between p-6 mb-6  sm:flex-row hover:rounded-lg hover:bg-gray-800 sm:justify-start"
      onClick={() => navigate(`/product-overview/${bookId}`)}
    >
      <img
        className="self-center w-32 h-48 sm:h-40 sm:w-18 overflow-hidden rounded-md"
        src={image}
        alt={nameBook}
      />
      {/* Actions for mobile */}
      <div className="relative">
        <div className="absolute bottom-0 items-center space-y-2 text-gray-100 right-16 sm:hidden">
          <TrashIcon
            // onClick={(e) => removeFromCartHandler(product)}
            title="Remove From Cart"
            className="w-8 h-8 p-2 text-red-400 duration-150 bg-red-100 rounded-full cursor-pointer opacity-80 hover:text-red-500"
          />
        </div>
      </div>
      <div className="flex flex-col items-center sm:items-start sm:flex-row sm:ml-4 sm:w-full sm:justify-between">
        <div className="flex flex-col justify-between mt-5 align-center sm:mt-0">
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-lg font-bold text-gray-100 lg:text-xl">
              {nameBook}
            </h2>
            {/* <p className="mt-1 text-xs text-gray-200 sm:text-sm">
              {authors.length > 0 ? authors[0] : "not auth"}
            </p> */}
          </div>
          <div className="flex flex-col items-center mt-4 space-x-4 text-gray-100 sm:flex-row">
            <p className="text-xs before:mr-1 before:content-['₹'] line-through text-gray-200">
              {price}
            </p>
            <p className="text-xl before:mr-1 before:content-['₹'] font-bold sm:text-2xl">
              {price}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between mt-4 sm:space-y-6 sm:mt-0 sm:block">
          {/* For Desktop */}

          <div className="relative items-center hidden  space-x-4 text-gray-100 sm:flex">
            <div className="ml-auto relative ">
              <div
                className="absolute -top-5"
                onClick={(e) => e.stopPropagation()}
              >
                <WishlistButton productId={bookId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBookCard;
