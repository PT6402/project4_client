import Slide1 from "assets/images/slide-1-b.jpg";
import Slide2 from "assets/images/slide-2-b.jpg";
import styles from "./index.module.scss";
export default function ListThumbnail() {
  return (
    <div className={styles.thumbnail}>
      <div className={styles.item}>
        <img src={Slide1} />
        <div className={styles.content}>Slider 1</div>
      </div>
      <div className={styles.item}>
        <img src={Slide2} />
        <div className={styles.content}>Slider 2</div>
      </div>
    </div>
  );
}
