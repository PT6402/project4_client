import InputSearch from "./InputSearch";
import { useEffect, useRef, useState } from "react";
import { ListBoxDropdown, Loader } from "../../components";

import { Link } from "react-router-dom";
import { useBook } from "../../hooks";

export default function SearchPage() {
  const searchRef = useRef();
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState([]);
  const [searchBy, setSearchBy] = useState("book");
  const [querySearch, setQuerySearch] = useState("");
  const { search, getBooks, getAuthors, isLoading } = useBook();
  const handleGetBySearch = (value) => {
    searchRef.current.value = "";
    setSearchBy(value);
  };
  const handleOnChangeQuery = (value) => {
    setQuerySearch(value);
  };
  const handleSearch = async () => {
    const data = await search({ searchBy, querySearch });
    setData(data);
  };

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);
  const handleClear = () => {
    searchRef.current.value = "";
    setQuerySearch("");
  };
  useEffect(() => {
    if (searchRef.current.value.trim() == "") {
      if (searchBy == "book") {
        getBooks({ goToPage: 1 }).then((res) => setData(res));
      } else {
        getAuthors().then((res) => setData(res));
      }
    } else {
      handleSearch();
    }
  }, [searchBy, querySearch]);
  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden ">
      <InputSearch
        handleOnChangeQuery={handleOnChangeQuery}
        querySearch={querySearch}
        searchRef={searchRef}
        handleClear={handleClear}
      >
        <ListBoxDropdown
          handleGetBySearch={handleGetBySearch}
          searchBy={searchBy}
        />
      </InputSearch>

      <div className="mx-auto max-w-2xl px-4 pt-5 sm:px-6  lg:max-w-7xl lg:px-8 overflow-y-auto h-[calc(100vh-14.5rem)]">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {showLoader ? (
            <Loader />
          ) : searchBy == "book" ? (
            data.map(({ bookid, imageCove, name }) => (
              <Link
                key={bookid}
                to={`/product-overview/${bookid}`}
                className="group"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={`data:image/png;base64,${imageCove}`}
                    alt={name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white ">{name}</h3>
              </Link>
            ))
          ) : (
            data.map(({ id, image_data, name, fileImage }) => (
              <Link key={id} to={`/product-overview/${id}`} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={`data:image/png;base64,${image_data || fileImage}`}
                    alt={name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white ">{name}</h3>
              </Link>
            ))
          )}
        </div>
        {!showLoader && querySearch.trim() != "" && data.length == 0 && (
          <div className="grid h-60 place-items-center">
            <div>
              <p className="my-4 text-2xl font-semibold tracking-wide text-gray-100">
                Search {searchBy[0].toUpperCase() + searchBy.substring(1)} is
                Empty.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
