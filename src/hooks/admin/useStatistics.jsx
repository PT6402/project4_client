import { useState, useEffect } from "react";
import useHttp from "../auth/useHttp";

const useStatistics = () => {
  // TODO: dùng http của useHttp tương lai sẽ dùng httpAuth để phân quyển admin
  const { http } = useHttp();

  const [statistics, setStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await http.get("/api/v1/statistics/");
        setStatistics(response.data.model);
      } catch (error) {
        setError(
          error.response
            ? error.response.data.message
            : "Error fetching statistics"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return {
    statistics,
    isLoading,
    error,
  };
};

export default useStatistics;
