/* eslint-disable react/prop-types */
// import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import WishlistButton from "../WishlistButton";
import AddToCartButton from "../AddToCardButton";
import IconStarFull from "../icons/IconStarFull";
// import { BooksContext } from "../../contexts/BooksProvider";

const ProductCard = ({ product }) => {
  // const { removeWishlistHandler } = useContext(BooksContext);

  const {
    imageCove: images,
    rating,
    ratingQuantity,
    name: nameBook,
    bookid: bookId,
  } = product;

  return (
    <div className="flex flex-col items-center self-start border border-gray-900 rounded-lg hover:bg-gray-800 hover:border hover:border-gray-700 ">
      <div className="relative">
        <Link to={`/product-overview/${bookId}`}>
          <img
            className="w-40 h-48 mt-3  lg:w-56 lg:h-80 rounded-lg overflow-hidden"
            src={`data:image/png;base64,${images || product?.fileImage}`}
            alt={nameBook}
          />
        </Link>
        <div className=" flex absolute items-center justify-center text-xs left-1 top-4 font-semibold px-1.5 py-0.5 rounded-md bg-cyan-900  text-gray-100">
          <p className="font-bold text-lg text-center">{rating}</p>
          <IconStarFull />
          <p className="-ml-2 relative top-0.5">({ratingQuantity})</p>
        </div>
        <WishlistButton productId={bookId} />
      </div>
      <div className="flex flex-col flex-wrap content-between justify-center px-5 pb-5 align-middle ">
        <h5
          title={nameBook}
          className="w-32 h-12 text-base font-semibold tracking-tight text-gray-100 lg:w-48 lg:text-lg lg:h-14 line-clamp-2"
        >
          {nameBook}
        </h5>

        <div className="flex flex-col space-y-2 ">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
