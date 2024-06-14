/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import http from "../http";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setEmail, setInfor, setTypeLogin } from "@/context/userSlice";
import useGoogle from "./useGoogle";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loginGoogle,
    error: errorGG,
    isLoading: loadingGG,
    userInfo,
  } = useGoogle();
  const register = async ({ typeLogin, fullname, email, password }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.post("/api/v1/auth/register", {
        fullname,
        email,
        password,
        type_login: typeLogin,
        type_device: "WEB",
      });
      if (res.status == 200) {
        if (typeLogin == "EMAIL") {
          dispatch(setEmail(email));
          dispatch(setTypeLogin(typeLogin));
          navigate(`/login`);
        } else {
          dispatch(
            setInfor({
              fullname: res.data.fullname,
              email: res.data.email,
              role: res.data.role,
              typeLogin: res.data.type_login,
              accessToken: res.data.access_token,
              isVerified: true,
            })
          );
          navigate("/");
        }
      }

      setError(null);
    } catch (error) {
      if (error.response.status == 409) {
        dispatch(setEmail(email));
        if (typeLogin == "GOOGLE") {
          dispatch(setTypeLogin(typeLogin));
        }
        navigate(`/login`);
      }

      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!errorGG && errorGG != undefined) {
      login({
        type_login: "GOOGLE",
        fullname: userInfo.inforUser.name,
        email: userInfo.inforUser.email,
        password: userInfo.access_token,
      });
    }
  }, [loadingGG]);
  const checkTypeLogin = async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.get(`/api/v1/auth/check-type-login/${email}`);
      if (res.status == 200) {
        if (res.data == "EMAIL") {
          dispatch(setEmail(email));
          return { typeLogin: "EMAIL" };
        } else {
          loginGoogle();
        }
        setIsLoading(false);
        setError(null);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data);
      console.log(error.response.data);
    }
  };
  const login = async ({ email, password, type_login }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.post("/api/v1/auth/login", {
        email,
        password,
        type_login,
        type_device: "WEB",
      });
      if (res.status == 200) {
        dispatch(
          setInfor({
            fullname: res.data.fullname,
            email: res.data.email,
            role: res.data.role,
            typeLogin: res.data.type_login,
            accessToken: res.data.access_token,
            isVerified: true,
          })
        );
        navigate("/");
        setError(null);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkTypeLogin,
    register,
    login,
    isLoading,
    error,
  };
};

export default useAuth;
