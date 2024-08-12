import { useState, useEffect } from "react";
import useHttp from "../auth/useHttp";

const useStatistics = () => {
  // TODO: dùng http của useHttp tương lai sẽ dùng httpAuth để phân quyển admin
  const { http } = useHttp();

  const [statistics, setStatistics] = useState([]);
  const [topBuy, setTopBuy] = useState([]);
  const [topRent, setTopRent] = useState([]);
  const [topLike, setTopLike] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const [statsResponse, topBuyResponse, topRentResponse, topLikeResponse, newReleasesResponse] = await Promise.all([
          http.get("/api/v1/statistics/"),
          http.get("/api/v1/statistics/topbuy"),
          http.get("/api/v1/statistics/toprent"),
          http.get("/api/v1/statistics/toplike"),
          http.get("/api/v1/statistics/top4"),
        ]);

        setStatistics(statsResponse.data.model);
        setTopBuy(topBuyResponse.data.model);
        setTopRent(topRentResponse.data.model);
        setTopLike(topLikeResponse.data);
        setNewReleases(newReleasesResponse.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : "Error fetching statistics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return {
    statistics,
    topBuy,
    topRent,
    topLike,
    newReleases,
    error,
    isLoading,
  };
};

export default useStatistics;
