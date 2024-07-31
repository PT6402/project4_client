import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { usePayment } from "../hooks";
import { ThankYouPage } from "../pages";
import { Loader } from "../components";

export default function RoutePaymentSuccess() {
  // const [showLoader, setShowLoader] = useState(true);
  // const { handleSendStatusPayment, isLoading } = usePayment();
  // const { idOrder, tokenPayment } = useParams();

  // const sendStatusPayment = useCallback(() => {
  //   handleSendStatusPayment({ orderId: idOrder, token: tokenPayment });
  // }, []);

  // useEffect(() => {
  //   sendStatusPayment();
  // }, []);

  // useEffect(() => {
  //   if (isLoading) {
  //     setShowLoader(true);
  //   } else {
  //     setShowLoader(false);
  //   }
  // }, [isLoading]);

  // if (showLoader) return <Loader />;
  return <ThankYouPage />;
}
