/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import http from "../http";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  setAccessToken,
  setEmail,
  setInfor,
  setTypeLogin,
} from "@/context/userSlice";
import useGoogle from "./useGoogle";
import toast from "react-hot-toast";
import useWishlist from "./useWishlist";
import useCart from "./useCart";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // use Google
  const {
    loginGoogle,
    error: errorGG,
    isLoading: loadingGG,
    userInfo,
  } = useGoogle();

  // useWishlist
  const { getWishlist } = useWishlist();
  const { getCart } = useCart();

  const { inforUser } = useSelector((state) => state.userStore);
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
          const data = res.data.model;
          dispatch(
            setInfor({
              fullname: data.fullname,
              email: data.email,
              role: data.role,
              userDetailId: data.userDetailId,
              typeLogin: data.type_login,
              accessToken: data.access_token,
              isLoggedIn: true,
            })
          );
          navigate("/");
        }
      }

      setError(null);
    } catch (error) {
      if (error.response.status == 409) {
        dispatch(setEmail(null));
        if (typeLogin == "GOOGLE") {
          dispatch(setTypeLogin(typeLogin));
        }
        toast.error("user is already");
        // sendToast({ error: true, message: "user is already" });
      }

      //   navigate(`/login`);
      setError(error);
      return { errorExist: true };
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
        if (res.data.model == "EMAIL") {
          dispatch(setEmail(email));
          return { typeLogin: "EMAIL" };
        } else {
          loginGoogle();
        }
      } else {
        setError(true);
        return { errorNotFound: true };
      }
    } catch (error) {
      setError(true);
      if (error?.response?.data) {
        dispatch(setEmail(null));
        dispatch(setTypeLogin(null));
        toast.error(error?.response.data.message);
        // sendToast({ error: true, message: error?.response?.data });
        console.log(error?.response?.data);
        return { errorNotFound: true };
      }
    } finally {
      setIsLoading(false);
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
        const data = res.data.model;
        dispatch(
          setInfor({
            fullname: data.fullname,
            email: data.email,
            role: data.role,
            typeLogin: data.type_login,
            accessToken: data.access_token,
            userDetailId: data.userDetailId,
            isLoggedIn: true,
          })
        );
        await getWishlist({ userDetailId: data.userDetailId });
        await getCart(data.userDetailId);
        navigate("/");
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      // sendToast({ error: true, message: error?.response?.data });
      toast.error(error.response.data.message);
      if (error?.response?.data?.message == "password wrond") {
        return { errorPassword: true };
      }
      if (error?.response?.data?.message == "user not found") {
        dispatch(setEmail(null));
        dispatch(setTypeLogin(null));
        console.log(error?.response?.data);
        return { errorNotFound: true };
      }
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.get(`api/v1/auth/forgot-password/${email}`);
      if (res.status == 200) {
        dispatch(setEmail(email));
        dispatch(setAccessToken(res.data.model));
        navigate("/reset-password");
      }
    } catch (error) {
      setError(true);
      toast.error(error.response.data.message);
      // sendToast({ error: true, message: error?.response?.data });
      if (error?.response?.data?.message == "user not found") {
        return { errorNotFound: true };
      }

      if (error?.response?.data?.message == "type invalid") {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkCodeReset = async ({ code }) => {
    setIsLoading(true);
    setError(null);
    try {
      if (inforUser?.accessToken != null && inforUser?.email != null) {
        const res = await http.post(`api/v1/auth/check-code-reset`, {
          code,
          access_token: inforUser?.accessToken,
          email: inforUser?.email,
        });
        if (res.status == 200) {
          return true;
        }
      } else {
        setError(true);
        return false;
      }
    } catch (error) {
      setError(true);
      if (error?.response?.data?.message == "token invalid") {
        toast.error("code reset wrond");
        // sendToast({ error: true, message: "code reset wrond" });
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const resetPassword = async ({ new_password, code }) => {
    setIsLoading(true);
    setError(null);
    try {
      if (inforUser?.accessToken != null && inforUser?.email != null) {
        const res = await http.post(`api/v1/auth/reset-password`, {
          new_password,
          code,
          access_token: inforUser?.accessToken,
          email: inforUser?.email,
        });
        if (res.status == 200) {
          dispatch(setTypeLogin("EMAIL"));
          navigate("/login");
        }
        // console.log({ new_password, code, access_token, email });
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.log(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogout = () => {};
  return {
    login,
    register,
    checkCodeReset,
    resetPassword,
    forgotPassword,
    checkTypeLogin,
    handleLogout,
    isLoading,
    error,
  };
};

export default useAuth;
