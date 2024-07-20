import { useState } from "react";
import http from "../http";
import { useSelector } from "react-redux";
import useAuth from "./useAuth";

const usePayment = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const {
    inforUser: { userDetailId },
  } = useSelector((state) => state.userStore);
  const { handleReloadPage } = useAuth();
  const handleCheckout = async ({ cartId }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.post(
        `/api/v1/orders/checkout/${userDetailId}/${cartId}`
      );
      return res.data.model.payment_url;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSendStatusPayment = async ({ orderId, token }) => {
    setIsLoading(true);
    setError(null);
    try {
      const userId = await handleReloadPage();
      await http.post(`/api/v1/orders/check`, {
        orderId,
        token,
        userDetailId: userId,
      });
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { handleSendStatusPayment, handleCheckout, isLoading, error };
};
export default usePayment;
