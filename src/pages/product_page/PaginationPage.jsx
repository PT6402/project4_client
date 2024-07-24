import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentPage } from "../../context/bookSlice";
import { useBook, useFilter } from "../../hooks";

export default function PaginationPage() {
  const dispatch = useDispatch();
  const { filterBook } = useFilter();
  const { getBooks } = useBook();
  const {
    collection: { totalPage, currentPage },
    filterBook: { isFilter },
  } = useSelector((state) => state.bookStore);

  const handleNextPage = () => {
    if (currentPage == totalPage) return;
    dispatch(setCurrentPage(currentPage + 1));
    if (isFilter) {
      filterBook();
    } else {
      getBooks({ goToPage: currentPage + 1 });
    }
  };

  const handlePrevPage = () => {
    if (currentPage == 1) return;
    dispatch(setCurrentPage(currentPage - 1));
    if (isFilter) {
      filterBook();
    } else {
      getBooks({ goToPage: currentPage - 1 });
    }
  };

  const handleGotoPage = (index) => {
    dispatch(setCurrentPage(index));
    if (isFilter) {
      filterBook();
    } else {
      getBooks({ goToPage: index });
    }
  };
  return (
    <div className="flex items-center justify-between bg-gray-900 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          to="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          to="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center mt-10">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={handlePrevPage}
              className="relative inline-flex items-center rounded-l-md px-2 py-3 text-gray-400 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {Array(totalPage)
              .fill(null)
              .map((item, i) => {
                if (currentPage == i + 1) {
                  return (
                    <button
                      key={i}
                      className="relative z-10 inline-flex items-center bg-cyan-900 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
                    >
                      {i + 1}
                    </button>
                  );
                } else {
                  return (
                    <button
                      onClick={() => handleGotoPage(i + 1)}
                      key={i}
                      className="relative hidden items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 first-line:focus:z-20 focus:outline-offset-0 md:inline-flex"
                    >
                      {i + 1}
                    </button>
                  );
                }
              })}

            <button
              onClick={handleNextPage}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
