import { useCallback, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";
import Step1 from "./Step1";
import { Button } from "@material-tailwind/react";
import Step2 from "./Step2";
import Step3 from "./Step3";
import useAdminBook from "../../../../hooks/admin/userAdminBook";
import { Link } from "react-router-dom";
export default function AdminCreateBookPage() {
  let dataForm = useRef({});
  const [currentStep, setCurrentStep] = useState();
  const { isLoading, getPropertiesList, createBook } = useAdminBook();
  const [showLoader, setShowLoader] = useState(true);
  const [dataProperties, setDataProperties] = useState();
  const sliderRef = useRef();
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  useEffect(() => {
    getPropertiesList().then((res) => setDataProperties(res));
  }, []);
  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);
  const handleGetValueStep1 = ({ name, price, edition, file }) => {
    dataForm.current.value = {
      ...dataForm.current?.value,
      name,
      price,
      edition,
      file,
    };
    // console.log({ name, price, edition, file });
  };
  const handleGetValueStep2 = ({ cates, authors, publisher }) => {
    let categories = cates?.map((item) => item?.value);
    let authorList = authors?.map((item) => item?.value);
    dataForm.current.value = {
      ...dataForm.current?.value,
      cates: categories,
      authors: authorList,
      publisher: publisher?.value,
    };
    // console.log({ cates, authors, publisher });
  };

  const handleEditorChange = (_, editor) => {
    const text = editor.getData().replace(/<[^>]*>?/gm, ""); // Remove HTML tags
    dataForm.current.value = {
      ...dataForm.current?.value,
      des: text,
    };
    // console.log(text);
  };
  const handleSubmit = async () => {
    var response = await createBook(dataForm.current?.value);
    console.log(response);
  };
  if (showLoader) return <p>Loading...</p>;
  return (
    <div>
      <Link to={"/admin/book"} className="">
        <Button variant="gradient" className="">
          back
        </Button>
      </Link>
      <Swiper
        simulateTouch={false}
        modules={[Navigation]}
        className="rounded-2xl mt-10 bg-white "
        ref={sliderRef}
        onSlideChange={(value) => setCurrentStep(value.activeIndex)}
      >
        <SwiperSlide>
          <Step1 handleGetValueStep1={handleGetValueStep1} />
        </SwiperSlide>
        {dataProperties && (
          <SwiperSlide>
            <Step2
              data={dataProperties}
              handleGetValueStep2={handleGetValueStep2}
            />
          </SwiperSlide>
        )}
        <SwiperSlide>
          <Step3 onChange={handleEditorChange} />
        </SwiperSlide>
      </Swiper>
      <div className="flex justify-between mt-2">
        <Button onClick={handlePrev}>Prev</Button>
        {currentStep == 2 ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button onClick={handleNext}>Prev</Button>
        )}
        {/* <Button onClick={handleNext}>Prev</Button> */}
      </div>
    </div>
  );
}
