import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import http, { HttpStatusCode } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../context/authSlice";
const useHttp = () => {
  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  http.defaults.baseURL = URL_SERVER;
  http.defaults.withCredentials = true;

  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const { accessToken } = useSelector((state) => state.auth);

  const http_auth = (accessArg = accessToken) => {
    const newInstance = http.create();
    newInstance.interceptors.request.use(
      async (config) => {
        let date = new Date();
        if (accessArg != null) {
          const decodeToken = jwtDecode(accessArg);
          if (decodeToken.exp < date.getTime() / 1000) {
            const newAccessToken = await handleRefreshToken();
            config.headers.Authorization = `Bearer ${newAccessToken}`;
          } else {
            config.headers.Authorization = `Bearer ${accessArg}`;
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
        dispatch(
          setLogin({
            accessToken: res.data.model,
            isLoggedIn: true,
          })
        );
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
