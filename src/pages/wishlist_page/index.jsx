import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductCard } from "../../components";
import { useSelector } from "react-redux";
import { useWishlist } from "../../hooks";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.userStore);

  useEffect(() => {
    document.title = "Wishlist | The Book Shelf";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);
  return (
    <section>
      <h1
        className={`${wishlist.length > 0 ? "mb-5" : ""} 
        mt-40 sm:mt-20 font-bold tracking-tight text-center text-gray-100 md:text-xl lg:text-4xl `}
      >
        Wishlist
      </h1>
      {/* {wishListedItems && wishListedItems.length > 0 && (
        <section className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center">
            {wishListedItems.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )} */}
      {/* <Transition
        appear={true}
        enter="transition-all ease-in-out duration-500 delay-[100ms]"
        enterFrom="opacity-0 translate-y-6"
        show={true}
        enterTo="opacity-100 translate-y-0"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      > */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {wishlist.map((product) => (
            <ProductCard key={product.wishId} product={product} />
          ))}
        </div>
      </div>
      {/* </Transition> */}
      {wishlist && wishlist.length === 0 && (
        <div className="grid h-60 place-items-center">
          <div>
            <p className="my-4 text-2xl font-semibold tracking-wide text-gray-100">
              Wishlist is Empty.
            </p>
            <Link
              to="/products"
              className="w-full px-5 block py-2.5 text-xs lg:text-sm font-medium text-center text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default WishlistPage;
