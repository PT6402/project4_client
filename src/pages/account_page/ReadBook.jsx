/* eslint-disable react/prop-types */
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ItemSwiper from "./ItemSwiper";
import { useSelector } from "react-redux";

export default function ReadBook({
  sliderRef,
  zoom,
  handleCurrentSlide,
  data,
}) {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-2rem)] w-[calc(100vw-0.5rem)] -ml-1 p-4">
      <Swiper
        ref={sliderRef}
        slidesPerView={1}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        grabCursor={false}
        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
        className={"mySwiper slider-navigation rounded-lg"}
        onSlideChange={(value) => handleCurrentSlide(value.activeIndex)}
      >
        {data.map((item, i) => (
          <SwiperSlide className="relative" key={i}>
            <ItemSwiper zoom={zoom} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
