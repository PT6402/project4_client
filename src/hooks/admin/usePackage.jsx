import { useState } from "react";
import { HttpStatusCode } from "axios";
import useHttp from "../auth/useHttp";

const usePackage = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { http_auth } = useHttp();
  const auhtHttp = http_auth();
  const getPackages = async () => {
    setIsLoading(true);
    try {
      const response = await auhtHttp.get("/api/v1/package/view");
      if (response.status === HttpStatusCode.Ok) {
        setPackages(response.data.model);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPackage = async (packageData) => {
    setIsLoading(true);
    try {
      const response = await auhtHttp.post(
        "/api/v1/package/create",
        packageData
      );
      if (response.status === HttpStatusCode.Ok) {
        return { success: true };
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create package");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    packages,
    isLoading,
    error,
    getPackages,
    createPackage,
  };
};

export default usePackage;
