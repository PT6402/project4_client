import { Swiper, SwiperSlide } from "swiper/react";
import ItemAuthor from "./ItemAuthor";
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
export default function SliderAuthor() {
  const { authors } = useSelector((state) => state.bookStore);
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
          {authors.map(({ id, name, image_data }, i) => (
            <SwiperSlide className=" !bg-transparent" key={i}>
              <ItemAuthor name={name} image_data={image_data} id={id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
