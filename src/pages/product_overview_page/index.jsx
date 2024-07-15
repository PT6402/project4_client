import { useEffect, useState } from "react";
import { AddToCartButton, Loader, WishlistButton } from "../../components";
import { singleBook } from "./data_single_book";
import axios from "axios";
import http from "../../http";
import { useParams } from "react-router-dom";
import { bookDetail } from "../../hooks/data/bookDetail";
import useBook from "../../hooks/useBook";
import IconStarFull from "../../components/icons/IconStarFull";

const ProductOverviewPage = () => {
  const [showLoader, setShowLoader] = useState(true);
  const { getBookDetail } = useBook();
  const { id: bookId } = useParams();
  const [dataDetail, setDataDetail] = useState({});

  useEffect(() => {
    (async () => {
      const data = await getBookDetail({ id: bookId });
      setDataDetail(data);
    })();
  }, []);

  useEffect(() => {
    document.title = "Product Overview | The Book Shelf";
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  }, []);
  if (showLoader) return <Loader />;

  return (
    <section className="overflow-hidden text-gray-100">
      {dataDetail &&
        (() => {
          const {
            fileimage,
            name,
            packlist,
            id,
            pageQuantity,
            rating,
            publisherDescription,
            ratingQuantity,
            authorlist,
            reviewlist,
          } = dataDetail;
          return (
            <div className="container px-5 pt-32 pb-4 mx-auto sm:py-24">
              <div className="flex flex-wrap items-center mx-auto lg:max-w-5xl">
                <img
                  alt={name}
                  className="object-cover object-center w-full rounded h-1/2 lg:w-1/4"
                  src={`data:image/png;base64,${fileimage}`}
                />

                <div className="w-full mt-6 lg:w-2/3 lg:pl-10 lg:py-6 lg:mt-0">
                  <h2 className="relative text-sm tracking-widest text-gray-500 title-font">
                    {authorlist.map((author) => {
                      return <p key={author.id}>{author.name}</p>;
                    })}
                    <div className="absolute right-0 sm:bottom-4 sm:relative bottom-24">
                      <WishlistButton productId={bookId} />
                    </div>
                  </h2>
                  <h1 className="mb-1 text-3xl font-medium text-gray-100 title-font">
                    {name}
                  </h1>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      <div className=" flex  items-center justify-center text-xs left-1 top-4 font-semibold px-1.5 py-0.5 rounded-md bg-cyan-900  text-gray-100 mr-2">
                        <p className="font-bold text-lg text-center">
                          {rating}
                        </p>
                        <IconStarFull />
                        <p className="-ml-2 relative top-0.5">
                          (Qty: {ratingQuantity})
                        </p>
                      </div>
                      |
                      <span className="ml-3 text-gray-600">
                        {pageQuantity} Pages
                      </span>
                    </span>
                  </div>
                  <p className="leading-relaxed">{publisherDescription}</p>

                  <div className="flex items-baseline my-4">
                    {/* <span className="text-2xl before:mr-1 before:content-['$'] font-medium text-gray-100 title-font">
                      {price}
                    </span> */}
                    <div>
                      <h3 className="mb-4 font-semibold text-white">Package</h3>
                      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        {packlist.length > 0 &&
                          packlist.map((packageItem, i) => (
                            <li key={i} className="w-full">
                              <div className="flex items-center ps-3">
                                <input
                                  id={`horizontal-list-radio-license ${i}`}
                                  type="radio"
                                  value=""
                                  name="list-radio"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                  htmlFor={`horizontal-list-radio-license ${i}`}
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  <div>
                                    <span className="p-2">
                                      {packageItem.packageName}
                                    </span>
                                    -
                                    <span className="p-2">
                                      {packageItem.dayQuantity} day
                                    </span>
                                    -
                                    <span className="p-2">
                                      ${packageItem.rentPrice}
                                    </span>
                                  </div>
                                </label>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="flex ml-auto">
                      <AddToCartButton product={dataDetail} />
                    </div>
                  </div>
                </div>
              </div>
              {reviewlist.length > 0 && (
                <div className="flex flex-col mx-auto border-t border-gray-700 lg:max-w-5xl">
                  <h2 className="my-2 text-sm tracking-widest text-gray-500 title-font">
                    Recent Reviews
                  </h2>
                  {reviewlist.map(
                    ({
                      id,
                      username,
                      // date,
                      rating,
                      content: comment,
                    }) => (
                      <div
                        key={id}
                        className="flex content-center py-4 border-b border-gray-700"
                      >
                        <div className="grid grid-cols-4 grid-rows-1 gap-4">
                          <div className="flex flex-wrap items-center col-span-2">
                            <p className="w-40 truncate sm:w-60">{username}</p>
                            <div className="flex flex-col items-start justify-between w-full space-y-2 sm:flex-row">
                              {/* <p className="text-xs text-gray-500">{date} </p> */}
                              <span className="text-xs mr-3 font-semibold px-2.5 py-0.5 rounded bg-cyan-900 bg-opacity-80 text-gray-100">
                                {rating}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <p className="text-md">{comment}</p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          );
        })()}
    </section>
  );
};

export default ProductOverviewPage;
