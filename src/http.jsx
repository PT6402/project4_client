import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "./context/userSlice";
axios.defaults.baseURL = import.meta.env.VITE_URL_SERVER;
const refreshToken = localStorage.getItem("refreshToken");
const handleRefreshToken = async (dispatch) => {
  try {
    const res = await axios.get("/api/auth/refresh-token", {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    if (res.status == 200) {
      dispatch(setAccessToken(res.data));
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
const HttpAuth = () => {
  const user = useSelector((state) => state.userStore.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const accessToken = user.access_token;
      if (accessToken != null) {
        const decodeToken = jwtDecode(accessToken);
        if (decodeToken.exp < date.getTime() / 1000) {
          if (refreshToken != null) {
            const newAccessToken = await handleRefreshToken(dispatch);
            config.headers.Authorization = `Bearer ${newAccessToken}`;
          } else {
            navigate("/login");
          }
        } else {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } else {
        navigate("/login");
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
const http = axios;
export default http;
export { HttpAuth };
