import { useState } from "react";
import useHttp from "../auth/useHttp";
import { HttpStatusCode } from "axios";
import useBook from "../book/useBook";
import useMyBook from "./useMyBook";

const usePayment = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const { http_auth, http, handleRefreshToken } = useHttp();
  const authHttp = http_auth();
  const { getOrder } = useBook();
  const { getMyBook } = useMyBook();
  const handleCheckout = async ({ cartId }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authHttp.post(`/api/v1/orders/checkout/${cartId}`);

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
      const accessToken = await handleRefreshToken();
      const res = await http.post(
        `/api/v1/orders/check`,
        {
          orderId,
          token,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.status == HttpStatusCode.Ok) {
        getOrder();
        getMyBook();
      }
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
