/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function InputSearch({
  children,
  handleOnChangeQuery,
  querySearch,
  searchRef,
  handleClear,
}) {
  const [search, setSearch] = useState(querySearch);
  const debouncedValue = useDebounce(search);
  useEffect(() => {
    handleOnChangeQuery(debouncedValue);
  }, [debouncedValue]);
  return (
    <div className=" w-full z-20 relative -top-4 mb-1 ">
      <label
        className="mx-auto mt-24 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300 "
        htmlFor="search-bar"
      >
        <input
          id="search-bar"
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
          ref={searchRef}
          placeholder="search...."
          className="px-6 py-2 w-full rounded-md flex-1 outline-transparent border-transparent focus:outline-transparent focus:ring-transparent focus:border-transparent "
        />{" "}
        {searchRef.current?.value.trim() != "" && (
          <button
            className="w-full   md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70"
            onClick={handleClear}
          >
            <div className="relative">
              <div className="flex items-center transition-all opacity-1">
                <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                  <XMarkIcon className="w-4 h-4 " />
                </span>
              </div>
            </div>
          </button>
        )}
        <div>{children}</div>
      </label>
    </div>
  );
}
