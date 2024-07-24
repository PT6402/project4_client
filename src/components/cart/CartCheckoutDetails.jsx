/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import usePayment from "../../hooks/user/usePayment";

const CartCheckoutDetails = ({ cart }) => {
  const [coupon, setCoupon] = useState({ name: "", value: 0 });
  const [urlPay, setUrlPay] = useState(null);
  const allCoupons = [];
  const location = useLocation();
  const { handleCheckout } = usePayment();
  function calculateTotalPrice() {
    let totalPrice = 0;
    cart.forEach((item) => {
      let price;
      if (item.ibuy) {
        price = item.priceBuy;
      } else {
        const pack = item.packlist.find((pack) => pack.id === item.packId);
        price = pack ? pack.rentPrice : 0;
      }
      totalPrice += price;
    });
    return totalPrice;
  }
  const checkoutHandler = async () => {
    const url = await handleCheckout({
      cartId: cart[0].cartId,
    });
    setUrlPay(url);
  };
  useEffect(() => {
    if (urlPay != null) {
      window.location.href = urlPay;
    }
  }, [urlPay]);
  return (
    <div className="relative mb-20 sm:w-1/3">
      <div className="sticky left-0 right-0 w-full p-6 mt-6 border rounded-lg shadow-md top-40 md:mt-0">
        {location.pathname === "/checkout" &&
          allCoupons &&
          allCoupons.length > 0 && (
            <div className="pb-4 mb-4 border-b border-gray-700">
              <Dropdown
                dropdownData={allCoupons}
                setCouponHandler={setCoupon}
                heading={"Apply Coupons"}
              />
            </div>
          )}

        {cart &&
          cart.length > 0 &&
          cart.map(({ bookName, packId, bookId, priceBuy, packlist, ibuy }) => {
            let price;

            if (ibuy) {
              price = priceBuy;
            } else {
              const pack = packlist.find(({ id }) => id == packId);
              price = { rentPrice: pack.rentPrice, day: pack.dayQuantity };
            }
            return (
              <div
                key={bookId}
                title={bookName}
                className="flex justify-between mb-2"
              >
                <p className="w-40 text-gray-100 truncate">{bookName}</p>{" "}
                <p className="text-gray-100 before:mr-1 before:content-['$']">
                  {ibuy ? (
                    price
                  ) : (
                    <>
                      {price.rentPrice}/{price.day} day
                    </>
                  )}
                </p>
              </div>
            );
          })}
        <hr className="my-4" />
        <div className="flex justify-between text-gray-100">
          <p className="text-lg font-bold">Total</p>
          <div>
            <p className="mb-1 text-lg before:mr-1 before:content-['₹'] font-bold">
              {calculateTotalPrice()}
            </p>
          </div>
        </div>
        <button
          onClick={checkoutHandler}
          className="mt-6 
                w-full px-5 py-2.5 text-xs lg:text-sm font-medium text-center 
                text-gray-100 rounded-lg 
                bg-cyan-900 focus:ring-4 
                focus:outline-none 
                hover:bg-cyan-950 
                focus:ring-cyan-950"
        >
          checkout
        </button>
      </div>
    </div>
  );
};

export default CartCheckoutDetails;
