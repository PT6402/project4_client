import { useState } from "react";
import useHttp from "./useHttp";
import useUser from "./useUser";
import useWishlist from "../user/useWishlist";
import useCart from "../user/useCart";
import useCategory from "../book/useCategory";

const useLoadFirst = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const { handleRefreshToken } = useHttp();

  const { getUser } = useUser();
  const { getCategories } = useCategory();
  const { getWishlist } = useWishlist();
  const { getCart } = useCart();

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const accessToken = await handleRefreshToken();
      //----
      await getCategories();
      await getUser(accessToken);
      await getWishlist();
      await getCart();
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { load, isLoading, error };
};

export default useLoadFirst;
