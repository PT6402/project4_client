import { useState, useEffect } from "react";
import useHttp from "../auth/useHttp";

const useOrder = () => {
  // TODO: dùng http của useHttp tương lai sẽ dùng httpAuth để phân quyển admin
  const { http } = useHttp();

  const [orders, setOrders] = useState([]);
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

  useEffect(() => {
    getOrdersAdmin();
  }, []);

  return { orders, isLoading, error };
};

export default useOrder;
