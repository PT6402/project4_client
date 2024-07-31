import { useState } from "react";
import useHttp from "./useHttp";
import useUser from "./useUser";
import useWishlist from "../user/useWishlist";
import useCart from "../user/useCart";
import useCategory from "../book/useCategory";
import useBook from "../book/useBook";
import useMyBook from "../user/useMyBook";
import useTop from "../book/useTop";
import useAuthor from "../admin/useAuthor";

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
  const { getTopLike } = useTop();
  const { getAuthors } = useAuthor();

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await getCategories();
      await handleRefreshToken().then(async (accessToken) => {
        await getUser(accessToken);
        getWishlist(accessToken);
        getCart(accessToken);
        getOrder(accessToken);
        getMyBook(accessToken);
        await getTopLike();
        await getAuthors();
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
