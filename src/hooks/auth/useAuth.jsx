/* eslint-disable react-hooks/exhaustive-deps */
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "@/context/userSlice";
import { clearAuth, setLogin } from "../../context/authSlice";
import useCart from "../user/useCart";
import { clearUser } from "../../context/userSlice";
import useWishlist from "../user/useWishlist";
import useHttp from "./useHttp";
import useUser from "./useUser";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const { accessToken } = useSelector((state) => state.auth);
  const { getUser } = useUser();
  const { getCart } = useCart();
  const { getWishlist } = useWishlist();
  const { http, http_auth } = useHttp();
  const auth_http = http_auth();

  const register = async ({ email, password, name }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.post("/api/v1/auth/register", {
        email,
        password,
        name,
      });
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setEmail(email));
        navigate(`/login`);
      }
      setError(null);
    } catch (error) {
      if (error.response.status == 409) {
        dispatch(setEmail(null));
        toast.error("user is already");
        return { errorExist: true };
      }
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res.status == HttpStatusCode.Ok) {
        const data = res.data.model;
        dispatch(setLogin({ accessToken: data, isLoggedIn: true }));
        await getUser(data);
        await getWishlist();
        await getCart();
        navigate("/");
      }
    } catch (error) {
      setError(error);
      toast.error(error.response.data.message);
      if (error?.response?.data?.message == "password wrond") {
        return { errorPassword: true };
      }
      if (error?.response?.data?.message == "user not found") {
        dispatch(setEmail(null));
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
      if (res.status == HttpStatusCode.Ok) {
        dispatch(setEmail(email));
        navigate("/reset-password");
      }
    } catch (error) {
      setError(true);
      toast.error(error.response.data.message);
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
      const formData = new FormData();
      formData.append("code", code);
      const res = await http.post(`api/v1/auth/check-code-reset`, formData);
      if (res.status == HttpStatusCode.Ok) {
        return true;
      }
    } catch (error) {
      setError(error);
      if (error?.response?.data?.message == "token invalid") {
        toast.error("code reset wrond");
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
      const res = await http.post(`api/v1/auth/reset-password`, {
        code,
        newPassword: new_password,
      });
      if (res.status == HttpStatusCode.Ok) {
        navigate("/login");
      }
    } catch (error) {
      setError(true);
      console.log(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (accessToken != null) {
        const res = await auth_http.get(`/api/v1/user/logout`);
        if (res.status == 200) {
          dispatch(clearAuth());
          dispatch(clearUser());
          navigate("/");
        }
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    checkCodeReset,
    resetPassword,
    forgotPassword,
    handleLogout,
    isLoading,
    error,
  };
};

export default useAuth;
