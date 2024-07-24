import { useState } from "react";
import useHttp from "./useHttp";
import useUser from "./useUser";
import useWishlist from "../user/useWishlist";
import useCart from "../user/useCart";
import useCategory from "../book/useCategory";
import useBook from "../book/useBook";
import useMyBook from "../user/useMyBook";

const useLoadFirst = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const { handleRefreshToken } = useHttp();

  const { getUser } = useUser();
  const { getCategories } = useCategory();
  const { getWishlist } = useWishlist();
  const { getCart } = useCart();
  const { getOrder } = useBook();
  const { getMyBook } = useMyBook();

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await getCategories();
      await handleRefreshToken().then((accessToken) => {
        getUser(accessToken);
        getWishlist(accessToken);
        getCart(accessToken);
        getOrder(accessToken);
        getMyBook(accessToken);
      });
      //----
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
