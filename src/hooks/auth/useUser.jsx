import { useState } from "react";
import { useDispatch } from "react-redux";
import useHttp from "./useHttp";
import { HttpStatusCode } from "axios";
import { setLogin } from "../../context/authSlice";
import { setInfor } from "../../context/userSlice";

const useUser = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const { http_auth, http } = useHttp();
  const auth_http = http_auth();
  const getUser = async (accessToken) => {
    try {
      let res;
      if (!accessToken) {
        res = await auth_http.get("/api/v1/user");
      } else {
        res = await http.get("api/v1/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.status == HttpStatusCode.Ok) {
          // auth
          dispatch(
            setLogin({
              accessToken: accessToken,
              isLoggedIn: true,
            })
          );
        }
      }
      if (res.status == HttpStatusCode.Ok) {
        const data = res.data.model;

        // set user
        dispatch(
          setInfor({
            fullname: data.fullname,
            email: data.email,
            role: data.role,
          })
        );

        return;
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { getUser, isLoading, error };
};

export default useUser;
