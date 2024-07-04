import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useUser = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userStore = useSelector((state) => state.userStore);

  return { userStore, isLoading, error };
};

export default useUser;
