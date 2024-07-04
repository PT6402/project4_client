import { useEffect, useState } from "react";

import { Transition } from "@headlessui/react";
import { Loader, ProductCard } from "../../components";
import useBook from "../../hooks/useBook";
import ProductLayout from "./ProductLayout";
import PaginationPage from "./PaginationPage";

const ProductPage = () => {
  const [showLoader, setShowLoader] = useState(true);
  const {
    bookStore: { listBooks },
    isLoading,
  } = useBook();

  useEffect(() => {
    document.title = "Products | The Book Shelf";
    const loader = setTimeout(() => {
      if (!isLoading) {
        setShowLoader(false);
      }
    }, 2000);
    return () => clearTimeout(loader);
  }, [isLoading]);

  if (showLoader) return <Loader />;
  return (
    <ProductLayout>
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
        {listBooks && listBooks.length > 0 && (
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {listBooks.map((product) => (
              <ProductCard key={product.bookId} product={product} />
            ))}
          </div>
        )}
      </Transition>
      {listBooks && listBooks.length === 0 && (
        <div className="flex justify-center my-20 sm:my-32">
          <p className="text-2xl text-center text-gray-100 sm:text-4xl">
            Oops! Looks like our Book Shelf is empty. 😟
          </p>
        </div>
      )}
      <PaginationPage />
    </ProductLayout>
  );
};

export default ProductPage;
