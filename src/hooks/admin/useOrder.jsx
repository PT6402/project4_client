import { useState, useEffect } from "react";
import useHttp from "../auth/useHttp";

const useOrder = () => {
  // TODO: dùng http của useHttp tương lai sẽ dùng httpAuth để phân quyển admin
  const { http } = useHttp();

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getOrdersAdmin = async () => {
    setIsLoading(true);
    try {
      const response = await http.get("/api/v1/orders/admin");
      setOrders(response.data.model);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderDetailsForAdmin = async (orderId) => {
    setIsLoading(true);
    try {
      const response = await http.get(`/api/v1/orders/admin/${orderId}`);
      setOrder(response.data.model);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch order details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrdersAdmin();
  }, []);

  useEffect(() => {
    getOrdersAdmin();
  }, []);

  return { orders, order, isLoading, error, getOrderDetailsForAdmin };
};

export default useOrder;
