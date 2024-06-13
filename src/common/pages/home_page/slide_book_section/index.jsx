import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { Button, Slider } from "@/common/components";
import { Autoplay, Pagination } from "swiper/modules";
import styles from "./index.module.scss";
import Slide1 from "assets/images/slide-1-b.jpg";
import Slide2 from "assets/images/slide-2-b.jpg";
import Slide3 from "assets/images/slide-3-b.jpg";
export default function SlideBookSection() {
  const [showContent, setShowContent] = useState(true);

  const isBigScreen = useMediaQuery({
    query: "(min-width: 900px)",
  });

  useEffect(() => {
    setShowContent(false);

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isBigScreen]);

  const bigScreenSlides = [
    {
      src: Slide1,
      id: 1,
    },
    {
      src: Slide2,
      id: 2,
    },
    {
      src: Slide3,
      id: 3,
    },
  ];
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <div className={styles.content_container}>
          {showContent && (
            <div className={styles.content_wrapper}>
              <p className={styles.content_title}>Drop #01</p>
              <p className={styles.content_title}>De gira</p>
              <p className={styles.content_subtitle}>
                T-shirts, hoodies & more
              </p>
              <Button className={styles.button} to="/collections/products">
                Shop now
              </Button>
            </div>
          )}
          {isBigScreen && (
            <Slider
              slides={bigScreenSlides}
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              centeredSlides={true}
              grabCursor={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              sliderClassName={styles.slider}
              imageFillClassName={styles.big_image_fill}
              imageClassName={styles.big_image}
            />
          )}
          {!isBigScreen && (
            <Slider
              slides={bigScreenSlides}
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              centeredSlides={true}
              grabCursor={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              sliderClassName={styles.slider}
              imageFillClassName={styles.small_image_fill}
              imageClassName={styles.small_image}
            />
          )}
        </div>
      </div>
    </section>
  );
}
