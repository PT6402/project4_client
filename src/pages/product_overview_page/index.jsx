import { useEffect, useState } from "react";
import { AddToCartButton, Loader, WishlistButton } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import IconStarFull from "../../components/icons/IconStarFull";
import PricePackage from "../../components/PricePackage";
import { useSelector } from "react-redux";
import { useBook, useCart } from "../../hooks";

const ProductOverviewPage = () => {
  const navigate = useNavigate();
  const { id: bookId } = useParams();
  const [option, setOption] = useState({});
  const [showLoader, setShowLoader] = useState(true);
  const [dataDetail, setDataDetail] = useState({});
  const { getBookDetail, isLoading } = useBook();
  const { addToCart, updateCart, isLoading: loadCart } = useCart();
  const {
    inforUser: { isLoggedIn },
    cart: { items },
  } = useSelector((state) => state.userStore);
  const handleGetOption = ({ type, packageId }) => {
    setOption({ type, packageId });
  };
  const handleAddToCart = async (id) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const itemCart = items.find(({ bookId: id }) => id == bookId);
      if (itemCart) {
        await updateCart({
          cartItemId: itemCart.cartItemId,
          packId: option.type == "buy" ? 0 : option.packageId,
        });
        navigate("/cart");
      } else {
        const data = {
          bookId: Number(id),
          iBuy: option.type == "buy",
          packageId: option.packageId,
        };
        await addToCart(data);
      }
    }
  };
  useEffect(() => {
    (async () => {
      const data = await getBookDetail({ id: bookId });
      setDataDetail(data);
    })();
  }, []);

  useEffect(() => {
    document.title = "Product Overview | The Book Shelf";
  }, []);
  useEffect(() => {
    if (isLoading || loadCart) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading, loadCart]);
  if (showLoader) return <Loader />;

  return (
    <section className="overflow-hidden text-gray-100">
      {dataDetail?.id &&
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
            priceBuy,
          } = dataDetail;
          return (
            <div className="container px-5 pt-32 pb-4 mx-auto sm:py-24">
              <div className="flex flex-wrap items-center mx-auto lg:max-w-5xl">
                <img
                  alt={name}
                  className="object-cover object-center w-full rounded h-1/2 lg:w-1/4 self-start"
                  src={`data:image/png;base64,${fileimage}`}
                />

                <div className="w-full  lg:w-2/3 lg:pl-10  lg:mt-0 self-start">
                  <h1 className=" text-3xl font-medium text-gray-100 title-font">
                    {name}
                  </h1>
                  <h2 className="relative text-sm tracking-widest text-gray-500 title-font mb-1">
                    {authorlist?.map((author) => {
                      return <p key={author.id}>{author.name}</p>;
                    })}
                    <div className="absolute right-0 sm:bottom-4 sm:relative bottom-24">
                      <WishlistButton productId={bookId} />
                    </div>
                  </h2>
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
                    <PricePackage
                      packlist={packlist}
                      price={priceBuy}
                      handleGetOption={handleGetOption}
                    />
                    <div className="flex ml-auto">
                      <AddToCartButton
                        bookId={id}
                        cartUser={items}
                        onClick={() => handleAddToCart(id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {reviewlist?.length > 0 && (
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
