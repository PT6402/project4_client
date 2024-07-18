/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import WishlistButton from "../WishlistButton";
import IconStarFull from "../icons/IconStarFull";

const ProductCard = ({ product }) => {
  const {
    imageCove: images,
    rating,
    name: nameBook,
    bookid: bookId,
    bookname,
  } = product;

  return (
    <div className="flex flex-col items-center self-start   rounded-xl hover:bg-gray-800  ">
      <div className="relative">
        <Link to={`/product-overview/${bookId}`}>
          <img
            className="w-40 h-48 mt-3  lg:w-56 lg:h-80 rounded-lg overflow-hidden"
            src={`data:image/png;base64,${images || product?.fileImage}`}
            alt={nameBook}
          />
        </Link>
        <div className=" flex absolute items-center justify-center text-xs left-1 mt-2 font-semibold px-1.5 py-1 rounded-md bg-cyan-900  text-gray-100 bg-opacity-80">
          {/* <p className="font-bold text-md text-center">{rating}</p> */}
          <IconStarFull />
          <p className="ml-1 relative top-0">({rating})</p>
        </div>
        <WishlistButton productId={bookId} />
      </div>
      <div className="flex flex-col flex-wrap  justify-center px-5 align-middle ">
        <h5
          title={nameBook}
          className="w-32 pt-10 pb-2 text-base font-semibold tracking-tight text-gray-100 lg:w-48 lg:text-lg  line-clamp-2"
        >
          {nameBook || bookname}
        </h5>

        {/* <div className="flex flex-col space-y-2 ">
          <AddToCartButton product={product} />
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
