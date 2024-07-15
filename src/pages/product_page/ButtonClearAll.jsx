/* eslint-disable react/prop-types */
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";

export default function ButtonClearAll({ onClick }) {
  const {
    filterBook: { categorys, rating },
  } = useSelector((state) => state.bookStore);
  return (
    <div>
      {categorys.length > 0 && rating != null && (
        <div className="flex items-center justify-between my-4 text-gray-100 ">
          <button
            onClick={onClick}
            className="flex items-center p-2 text-sm text-gray-400 rounded-lg bg-gray-50 bg-opacity-10"
            type="button"
          >
            <XMarkIcon className="w-4 h-4 mr-2" /> Clear All
          </button>
        </div>
      )}
    </div>
  );
}
