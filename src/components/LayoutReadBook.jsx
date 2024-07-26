/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { IoIosClose } from "react-icons/io";
import InputForm from "./InputForm";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  MinusIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useCallback } from "react";
export default function LayoutReadBook({
  children,
  sliderRef,
  handleZoomOut,
  handleZoomIn,
  close,
}) {
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <div className="w-full h-full p-2 flex flex-col relative">
      <div className="flex justify-between items-center  ">
        <div className="flex gap-2">
          <InputForm className={"w-20 -mt-2"} />
          <Button color="gray" variant="filled" className="">
            Find
          </Button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          <p>-/-</p>
        </div>
        <div>
          <div
            className="border-2 rounded-full shadow-lg w-12 h-12 flex justify-center items-center -mt-1"
            onClick={close}
          >
            <IoIosClose className="w-10 h-10" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center flex-col  rounded-lg p-2 absolute bottom-4 right-0 z-20 ">
        <div
          className=" rounded-full w-10 h-10 flex justify-center items-center border-2 p-2"
          onClick={handleZoomIn}
        >
          <PlusIcon />
        </div>
        <div
          className=" rounded-full w-10 h-10 flex justify-center items-center border-2 p-2"
          onClick={handleZoomOut}
        >
          <MinusIcon />
        </div>
      </div>
      <div className=" rounded-md w-12 shadow-xl h-12 flex justify-center items-center border-2 p-2 absolute bottom-4 left-2 z-20">
        <PencilSquareIcon />
      </div>
      <div className="flex-grow flex items-center ">
        <ArrowLeftCircleIcon
          className="w-10 h-10 absolute z-30 left-1 top-1/2 -translate-y-1/2"
          onClick={handlePrev}
        />
        <div className="flex-grow">{children}</div>
        <ArrowRightCircleIcon
          className="w-10 h-10 absolute z-30 right-1 top-1/2 -translate-y-1/2"
          onClick={handleNext}
        />
      </div>
    </div>
  );
}
