import { useEffect, useState } from "react";
// import { BooksContext } from "../../contexts/BooksProvider";

import { Transition } from "@headlessui/react";
import Loader from "@/common/components/loader/Loader";
import { ProductCard } from "@/common/components";
const ProductPage = () => {
  const [showLoader, setShowLoader] = useState(true);
  //   const { booksState, allSortsAndFilters } = useContext(BooksContext);
  const booksState = {};
  const allSortsAndFilters = () => {};
  useEffect(() => {
    document.title = "Products | The Book Shelf";
    const loader = setTimeout(() => {
      setShowLoader(false);
    }, 2000);
    return () => clearTimeout(loader);
  }, []);

  const { booksData } = booksState;
  if (showLoader) return <Loader />;
  return (
    <>
      <Transition
        appear={true}
        enter="transition-all ease-in-out duration-500 delay-[100ms]"
        enterFrom="opacity-0 translate-y-6"
        show={true}
        enterTo="opacity-100 translate-y-0"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {booksData && booksData.length > 0 && (
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {allSortsAndFilters().map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </Transition>
      {booksData && allSortsAndFilters().length === 0 && (
        <div className="flex justify-center my-20 sm:my-32">
          <p className="text-2xl text-center text-gray-100 sm:text-4xl">
            Oops! Looks like our Book Shelf is empty. 😟
          </p>
        </div>
      )}
    </>
  );
};

export default ProductPage;
