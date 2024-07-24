import { useState } from "react";
import { OrderCard } from "../../components";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const [openOrderId, setOpenOrderId] = useState(null);

  const { orderHistorys: data } = useSelector((state) => state.userStore);

  const handleOrderClick = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  return (
    <>
      {data.length > 0 &&
        data.length > 0 &&
        data.map(({ paymentStatus, orderId, creatDate, orderDetails }) => (
          <div key={orderId} className="pt-2 m-4 border border-gray-700">
            <div
              className="grid grid-cols-1 grid-rows-1 gap-4 px-6 pb-2 border-b border-gray-700 sm:grid-cols-4 cursor-pointer"
              onClick={() => handleOrderClick(orderId)}
            >
              <div className="col-span-2">
                <dt className="text-gray-400">Order number</dt>
                <dd className="font-semibold">{orderId}</dd>
              </div>
              <div>
                <dt className="text-gray-400">Date placed</dt>
                <dd className="font-semibold">{creatDate}</dd>
              </div>
              <div>
                <dt className="text-gray-400">Status payment</dt>
                <dd className="font-semibold">
                  {/* {totalBill} */}
                  {paymentStatus == 1 ? "success" : "fail"}
                </dd>
              </div>
            </div>
            {openOrderId === orderId && (
              <div>
                {orderDetails.map((order) => (
                  <OrderCard key={order.bookId} order={order} />
                ))}
              </div>
            )}
          </div>
        ))}
      {data && data.length === 0 && <p>No order history.</p>}
    </>
  );
};

export default OrderHistory;
