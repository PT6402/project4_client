import { setClose, setError, setSuccess } from "@/context/toastSlide";
import { useDispatch } from "react-redux";

const useToast = () => {
  const dispatch = useDispatch();

  const sendToast = ({ success, error, message }) => {
    if (success) {
      dispatch(setSuccess(message));
    }
    if (error) {
      dispatch(setError(message));
    }
  };

  const close = () => {
    dispatch(setClose());
  };
  return { sendToast, close };
};
export default useToast;
