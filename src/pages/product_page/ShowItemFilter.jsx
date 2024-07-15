/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import IconStarFull from "../../components/icons/IconStarFull";

import { XMarkIcon } from "@heroicons/react/20/solid";

export default function ShowItemFilter({ handleClearCate, handleClearRating }) {
  const {
    filterBook: { isFilter, categorys, rating },
    categories,
  } = useSelector((state) => state.bookStore);

  return (
    <div className="text-white">
      {isFilter && (
        <div className="flex flex-col">
          {rating != null && (
            <div className="flex items-center">
              <button
                onClick={handleClearRating}
                className="flex items-center p-2 text-sm text-gray-400 rounded-lg bg-gray-50 bg-opacity-10 mr-1"
                type="button"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
              <p>Rating: </p>
              <div className="flex">
                <IconStarFull />({rating})
              </div>
            </div>
          )}
          {categorys?.length > 0 && (
            <div className="flex items-center mt-1">
              <button
                onClick={handleClearCate}
                className="flex items-center p-2 text-sm text-gray-400 rounded-lg bg-gray-50 bg-opacity-10 mr-1 self-start"
                type="button"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
              <div className=" mt-1">
                <p>Category: </p>
                <ul className="list-disc ml-10">
                  {categorys?.map((item, i) => {
                    var nameCate = categories.find(({ id }) => id == item);
                    return (
                      <li className="" key={i}>
                        <p>{nameCate?.name}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
