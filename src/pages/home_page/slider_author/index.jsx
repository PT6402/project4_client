import { Swiper, SwiperSlide } from "swiper/react";
import ItemAuthor from "./ItemAuthor";
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";
export default function SliderAuthor() {
  return (
    <div className="mt-10 border border-gray-700 backdrop-filter backdrop-blur-md rounded-xl">
      <p className="text-2xl text-white font-bold text-center pb-2 pt-5">
        Author
      </p>
      <div className="mb-3">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          modules={[Pagination]}
          className="mySwiper bg-transparent"
        >
          <SwiperSlide className=" !bg-transparent">
            <ItemAuthor />
          </SwiperSlide>
          <SwiperSlide className=" !bg-transparent">
            <ItemAuthor />
          </SwiperSlide>
          <SwiperSlide className=" !bg-transparent">
            <ItemAuthor />
          </SwiperSlide>
          <SwiperSlide className=" !bg-transparent">
            <ItemAuthor />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
