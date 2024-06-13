import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import useToast from "@/hooks/useToast";
import ToastModal from "./toast_modal";
import ToastContent from "./toast_content";

const Toast = () => {
  const { pathname } = useLocation();

  const { message, isSuccess, isError } = useSelector(
    (state) => state.toastStore
  );
  const { close } = useToast();

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    } else {
      setTimeout(() => {
        close();
      }, 100);
    }
  }, [pathname]);

  return (
    <ToastModal content={message}>
      {/* {message && ( */}
      <ToastContent
        content={message}
        error={isError}
        success={isSuccess}
        close={close}
      />
      {/* )} */}
    </ToastModal>
  );
};

export default Toast;
