/* eslint-disable react/prop-types */
import { TrashIcon } from "@heroicons/react/24/outline";
import PricePackage from "../PricePackage";
import { useState } from "react";

const CartCard = ({ product, deleteToCart, updateCart }) => {
  const {
    bookId,
    imageData,
    priceBuy,
    packlist,
    bookName,
    cartItemId,
    ibuy,
    packId,
  } = product;

  const [option, setOption] = useState(() => {
    if (ibuy != null && packId != null) {
      return {
        type: ibuy ? "buy" : "package",
        packageId: packId != 0 ? packId : null,
      };
    } else {
      return { type: "buy", packageId: null };
    }
  });
  const handleGetOption = async ({ type, packageId }) => {
    if (type != option.type || packageId != option.packageId) {
      setOption({ type, packageId });
      await updateCart({ cartItemId, packId: type == "buy" ? 0 : packageId });
    }
  };

  return (
    <div
      id={bookId}
      className="flex flex-col justify-between p-6 mb-6 border-b border-gray-700 sm:flex-row sm:justify-start"
    >
      <img
        className="object-cover object-center w-full rounded h-1/2 lg:w-1/4 self-start"
        src={`data:image/png;base64,${imageData}`}
        alt={bookName}
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
              {bookName}
            </h2>
            {/* <p className="mt-1 text-xs text-gray-200 sm:text-sm">
              {authors.length > 0 ? authors[0] : "not auth"}
            </p> */}
          </div>
          <div className="flex flex-col items-center mt-4 space-x-4 text-gray-100 sm:flex-row">
            {/* <p className="text-xs before:mr-1 before:content-['₹'] line-through text-gray-200">
              {priceBuy}
            </p> */}
            {/* <p className="text-xl before:mr-1 before:content-['₹'] font-bold sm:text-2xl">
              {priceBuy}
            </p> */}
            <PricePackage
              handleGetOption={handleGetOption}
              packlist={packlist}
              price={priceBuy}
              ibuy={ibuy}
              packId={packId}
              cartItemId={cartItemId}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between mt-4 sm:space-y-6 sm:mt-0 sm:block">
          {/* For Desktop */}

          <div className="relative items-center hidden  space-x-4 text-gray-100 sm:flex">
            <TrashIcon
              onClick={() => deleteToCart({ bookId: bookId })}
              title="Remove From Cart"
              className="w-8 h-8 p-2 text-red-400 duration-150 bg-gray-800 border border-gray-700 rounded-full cursor-pointer hover:text-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
