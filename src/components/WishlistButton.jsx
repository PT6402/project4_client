/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWishlist } from "../hooks";
import { useNavigate } from "react-router-dom";

const WishlistButton = ({ productId }) => {
  const navigate = useNavigate();
  const {
    wishlist,
    inforUser: { userDetailId },
  } = useSelector((state) => state.userStore);
  const { addWishlist, deleteWishlist, getWishlist } = useWishlist();
  const [active, setActive] = useState(() => {
    if (wishlist.find(({ bookid }) => bookid == productId)) {
      return true;
    } else {
      return false;
    }
  });

  const wishlistToggleHandler = () => {
    if (userDetailId) {
      if (active) {
        handleDeleteWishlist();
      } else {
        handleAddWishlist();
      }
    } else {
      navigate("/login");
    }
  };
  const handleAddWishlist = async () => {
    setActive(true);
    await addWishlist({ userDetailId, bookId: productId });
    await getWishlist({ userDetailId });
  };
  const handleDeleteWishlist = async () => {
    const wishlistItem = wishlist.find(({ bookid }) => bookid == productId);
    if (wishlistItem) {
      setActive(false);
      await deleteWishlist({ wishlistId: wishlistItem.wishId });
      await getWishlist({ userDetailId });
    }
  };
  const handleCheckActive = () => {
    if (wishlist.find(({ bookid }) => bookid == productId)) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  useEffect(() => {
    if (userDetailId) {
      handleCheckActive();
    }
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        wishlistToggleHandler();
      }}
      className="absolute -right-2 w-10 h-10 text-pink-600 rounded-full -mt-0 z-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`w-3/4 p-1 ${
          active ? "fill-current" : "hover:fill-current"
        }  rounded-full h-3/4`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
};

export default WishlistButton;
