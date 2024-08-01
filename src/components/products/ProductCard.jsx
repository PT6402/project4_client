/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import WishlistButton from "../WishlistButton";
import { StarIcon } from "@heroicons/react/20/solid";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const {
    imageCove: images,
    rating,
    name: nameBook,
    bookid: bookId,
    bookname,
    price,
    authors,
  } = product;

  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500  hover:shadow-xl cursor-pointer m-2 scale-75">
      <div
        // to={`/product-overview/${bookId}`}
        className=" relative"
        onClick={() => navigate(`/product-overview/${bookId}`)}
      >
        <img
          src={`data:image/png;base64,${images || product?.fileImage}`}
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        {price == 0 && (
          <div className="absolute w-full h-full top-0 bg-gray-600 bg-opacity-35 flex items-center justify-center font-bold text-2xl">
            het ban
          </div>
        )}
        <div className="px-4 py-3 w-72 ">
          <div className="flex justify-between items-center">
            <div>
              {authors &&
                authors.length > 0 &&
                authors.map((item, i) => (
                  <p key={i} className="text-gray-400 mr-3 uppercase text-xs ">
                    {item.name}
                  </p>
                ))}
            </div>
            <div className="flex justify-center items-center">
              <StarIcon className="w-6 h-6 relative -top-0.5" />
              <p>{rating}</p>
            </div>
          </div>
          <p className="text-lg font-bold text-black  block capitalize ">
            {/* {nameBook || bookname} */}
            {price != 0
              ? nameBook || bookname
              : nameBook?.split("-")[1] || bookname?.split("-")[1]}
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
};

export default ProductCard;
