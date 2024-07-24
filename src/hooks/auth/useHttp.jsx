import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import http, { HttpStatusCode } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../../context/authSlice";
const useHttp = () => {
  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  http.defaults.baseURL = URL_SERVER;
  http.defaults.withCredentials = true;

  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const {
    inforUser: { accessToken },
  } = useSelector((state) => state.userStore);

  const http_auth = () => {
    const newInstance = http.create();
    newInstance.interceptors.request.use(
      async (config) => {
        let date = new Date();
        if (accessToken != null) {
          const decodeToken = jwtDecode(accessToken);
          if (decodeToken.exp < date.getTime() / 1000) {
            const newAccessToken = await handleRefreshToken();
            config.headers.Authorization = `Bearer ${newAccessToken}`;
          } else {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }

        return config;
      },
      (err) => {
        console.log("error refresh token", err);
        return Promise.reject(err);
      }
    );
    return newInstance;
  };
  const handleRefreshToken = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.get("/api/v1/auth/refresh-token");
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setAccessToken(res.data.model));
        return res.data.model;
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { http_auth, http, isLoading, error, handleRefreshToken };
};

export default useHttp;
