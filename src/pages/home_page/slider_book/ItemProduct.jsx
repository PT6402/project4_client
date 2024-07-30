/* eslint-disable react/prop-types */
import { HeartIcon, StarIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import WishlistButton from "../../../components/WishlistButton";

export default function ItemProduct({
  bookId,
  bookName,
  likeQty,
  rating,
  price,
  imagedata,
}) {
  const navigate = useNavigate();
  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500  hover:shadow-xl cursor-pointer m-2 scale-75">
      <div
        // to={`/product-overview/${bookId}`}
        className=" "
        onClick={() => navigate(`/product-overview/${bookId}`)}
      >
        <img
          src={`data:image/png;base64,${imagedata}`}
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72 ">
          <div className="flex justify-end items-center">
            {/* <p className="text-gray-400 mr-3 uppercase text-xs ">Brand</p> */}
            <div className="flex justify-center items-center">
              <StarIcon className="w-6 h-6 relative -top-0.5" />
              <p>{rating}</p>
            </div>
          </div>
          <p className="text-lg font-bold text-black  block capitalize ">
            {bookName}
          </p>
          <div className="flex items-center ">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              ${price}
            </p>
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
}
