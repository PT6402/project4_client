import Slide1 from "assets/images/slide-1-b.jpg";
import Slide2 from "assets/images/slide-2-b.jpg";
import styles from "./index.module.scss";
export default function ListItem() {
  return (
    <div className={styles.list}>
      <div className={`${styles.item} ${styles.active}`}>
        <img src={Slide1} />
        <div className={styles.content}>
          <p>design</p>
          <h2>Slider 01</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            neque? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ipsum, ex.
          </p>
        </div>
      </div>
      <div className={`${styles.item}`}>
        <img src={Slide2} />
        <div className={styles.content}>
          <p>design</p>
          <h2>Slider 02</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            neque? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ipsum, ex.
          </p>
        </div>
      </div>
    </div>
  );
}
