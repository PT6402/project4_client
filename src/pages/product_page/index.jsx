import { useEffect, useState } from "react";
import { Loader, ProductCard } from "../../components";
import useBook from "../../hooks/useBook";
import ProductLayout from "./ProductLayout";
import PaginationPage from "./PaginationPage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshCollection, setFilterCate } from "../../context/bookSlice";
import { useFilter } from "../../hooks";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { filterBook } = useFilter();
  const [showLoader, setShowLoader] = useState(true);
  const {
    collection: { currentPage },
    listBook,
    filterBook: { isFilter },
  } = useSelector((state) => state.bookStore);
  const { isLoading, getBooks } = useBook();

  const handleFilter = async () => {
    dispatch(setFilterCate(id));
    if (!isFilter) {
      dispatch(refreshCollection());
    }
    await filterBook();
  };
  const handleListBook = async () => {
    await getBooks({ goToPage: currentPage });
  };
  useEffect(() => {
    document.title = "Products | The Book Shelf";
    const loader = setTimeout(() => {
      if (!isLoading) {
        setShowLoader(false);
      }
    }, 2000);
    return () => clearTimeout(loader);
  }, [isLoading, id]);
  useEffect(() => {
    if (id) {
      handleFilter();
    } else {
      handleListBook();
    }
  }, []);
  if (showLoader) return <Loader />;
  return (
    <ProductLayout>
      {listBook && listBook.length > 0 && (
        <div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {listBook.map((product) => (
              <ProductCard key={product.bookId} product={product} />
            ))}
          </div>
          <PaginationPage />
        </div>
      )}
      {listBook && listBook.length === 0 && (
        <div className="flex justify-center my-20 sm:my-32">
          <p className="text-md text-center text-gray-100 sm:text-2xl">
            Oops! Looks like our Book Shelf is empty. 😟
          </p>
        </div>
      )}
    </ProductLayout>
  );
};

export default ProductPage;
