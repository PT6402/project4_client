import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";

const useGoogle = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      //   console.log(tokenResponse);
      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      if (res.status == 200) {
        setUserInfo({
          infoUser: res.data,
          access_token: tokenResponse.access_token,
        });
        setIsLoading(false);
        setError(false);
      } else {
        setIsLoading(false);
        setError(true);
      }
    },
    error_callback: (e) => {
      if (e?.message) {
        setIsLoading(false);
        setError(true);
      } else {
        setIsLoading(false);
        setError(true);
      }
    },
  });
  return { loginGoogle, isLoading, error, userInfo, setIsLoading };
};
export default useGoogle;
