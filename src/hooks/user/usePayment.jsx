import { useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../auth/useHttp";
import useAuth from "../auth/useAuth";

const usePayment = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const {
    inforUser: { userDetailId },
  } = useSelector((state) => state.userStore);
  const { handleReloadPage } = useAuth();
  const { http_auth } = useHttp();
  const authHttp = http_auth();
  const handleCheckout = async ({ cartId }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authHttp.post(
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
      await authHttp.post(`/api/v1/orders/check`, {
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
