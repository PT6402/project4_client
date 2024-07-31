/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";
import ItemProduct from "./ItemProduct";
import { useSelector } from "react-redux";
export default function SliderBook() {
  const { topLike } = useSelector((state) => state.bookStore);

  return (
    <div className="mt-10 border border-gray-700 backdrop-filter backdrop-blur-md rounded-xl">
      <p className="text-2xl text-white font-bold text-center pb-2 pt-5">
        Top Like
      </p>
      <div className="border-t border-gray-700 mb-3">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          modules={[Pagination]}
          className="mySwiper bg-transparent"
        >
          {topLike.map(
            ({ bookId, bookName, likeQty, rating, price, imagedata }, i) => (
              <SwiperSlide className=" !bg-transparent" key={i}>
                <ItemProduct
                  bookId={bookId}
                  bookName={bookName}
                  likeQty={likeQty}
                  rating={rating}
                  price={price}
                  imagedata={imagedata}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  );
}
