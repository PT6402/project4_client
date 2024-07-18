import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartCard, CartCheckoutDetails, Loader } from "../../components";
import { listCart } from "./data_list_cart";
import useCart from "../../hooks/useCart";
import { useSelector } from "react-redux";

const CartPage = () => {
  // const cart = listCart;
  const {
    cart: { items },
  } = useSelector((state) => state.userStore);
  // const [dataCart, setDataCart] = useState([]);
  const { deleteToCart, updateCart, isLoading } = useCart();
  const [showLoader, setShowLoader] = useState(true);
  // const handleCallApiCart = async () => {
  //   const data = await getCart();
  //   setDataCart(data);
  // };

  useEffect(() => {
    document.title = "Cart | The Book Shelf";
  }, []);
  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);
  if (showLoader) return <Loader />;
  return (
    <div className="mt-40 sm:mt-20 ">
      <h1 className="my-4 font-bold tracking-tight text-center text-gray-100 md:text-xl lg:text-4xl">
        Cart Items
      </h1>
      {items && items.length > 0 && (
        <div className="justify-center max-w-5xl px-6 mx-auto md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {items.map((product) => (
              <CartCard
                key={product.bookId}
                product={product}
                deleteToCart={deleteToCart}
                updateCart={updateCart}
              />
            ))}
          </div>
          <CartCheckoutDetails cart={items} />
        </div>
      )}
      {items && items.length === 0 && (
        <div className="grid h-60 place-items-center">
          <div className="space-y-4">
            <p className="my-4 text-2xl font-semibold tracking-wide text-gray-100">
              Cart is Empty.
            </p>
            <Link
              to="/products"
              className="w-full px-5 block py-2.5 text-xs lg:text-sm font-medium text-center text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
            >
              SHOP NOW
            </Link>

            <Link
              to="/wishlist"
              className="w-full px-5 block py-2.5 text-xs lg:text-sm font-medium text-center text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
            >
              Add From Wishlist
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
