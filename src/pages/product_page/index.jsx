import { useEffect, useState } from "react";
import { ProductCard } from "../../components";

import ProductLayout from "./ProductLayout";
import PaginationPage from "./PaginationPage";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id: idCate } = useParams();

  const [dataBook, setDataBook] = useState();
  const handleSetDataBook = (data) => {
    setDataBook(data);
  };

  useEffect(() => {
    document.title = "Products | The Book Shelf";
  }, []);

  return (
    <ProductLayout handleSetDataBook={handleSetDataBook} idCate={idCate}>
      {dataBook && dataBook.length > 0 && (
        <div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {dataBook.map((product) => (
              <ProductCard key={product.bookid} product={product} />
            ))}
          </div>
          <PaginationPage />
        </div>
      )}
      {dataBook && dataBook.length === 0 && (
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
