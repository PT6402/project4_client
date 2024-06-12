/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";

const useKeyDown = (callback, keys) => {
  const onKeyDown = useCallback((event) => {
    const wasKeyPressed = keys.some((key) => event.key === key);
    if (wasKeyPressed) {
      event.preventDefault();
      callback();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
};

export default useKeyDown;
