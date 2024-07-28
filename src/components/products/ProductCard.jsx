/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import WishlistButton from "../WishlistButton";
import IconStarFull from "../icons/IconStarFull";
import { HeartIcon, StarIcon } from "@heroicons/react/20/solid";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const {
    imageCove: images,
    rating,
    name: nameBook,
    bookid: bookId,
    bookname,
  } = product;

  return (
    // <div className="flex flex-col items-center self-start   rounded-xl hover:bg-gray-800  ">
    //   <div className="relative">
    //     <Link to={`/product-overview/${bookId}`}>
    //       <img
    //         className="w-40 h-48 mt-3  lg:w-56 lg:h-80 rounded-lg overflow-hidden"
    //         src={`data:image/png;base64,${images || product?.fileImage}`}
    //         alt={nameBook}
    //       />
    //     </Link>
    //     <div className=" flex absolute items-center justify-center text-xs left-1 mt-2 font-semibold px-1.5 py-1 rounded-md bg-cyan-900  text-gray-100 bg-opacity-80">
    //       {/* <p className="font-bold text-md text-center">{rating}</p> */}
    //       <IconStarFull />
    //       <p className="ml-1 relative top-0">({rating})</p>
    //     </div>
    //     <WishlistButton productId={bookId} />
    //   </div>
    //   <div className="flex flex-col flex-wrap  justify-center px-5 align-middle ">
    //     <h5
    //       title={nameBook}
    //       className="w-32 pt-10 pb-2 text-base font-semibold tracking-tight text-gray-100 lg:w-48 lg:text-lg  line-clamp-2"
    //     >
    //       {nameBook || bookname}
    //     </h5>

    //     {/* <div className="flex flex-col space-y-2 ">
    //       <AddToCartButton product={product} />
    //     </div> */}
    //   </div>
    // </div>
    <div className="w-72 bg-white shadow-md rounded-xl duration-500  hover:shadow-xl cursor-pointer m-2 scale-75">
      <div
        // to={`/product-overview/${bookId}`}
        className=" "
        onClick={() => navigate(`/product-overview/${bookId}`)}
      >
        <img
          src={`data:image/png;base64,${images || product?.fileImage}`}
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72 ">
          <div className="flex justify-between items-center">
            <p className="text-gray-400 mr-3 uppercase text-xs ">Brand</p>
            <div className="flex justify-center items-center">
              <StarIcon className="w-6 h-6 relative -top-0.5" />
              <p>{rating}(10)</p>
            </div>
          </div>
          <p className="text-lg font-bold text-black  block capitalize ">
            {nameBook || bookname}
          </p>
          <div className="flex items-center ">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              $149
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
