import styles from "./index.module.scss";
import Slide1 from "assets/images/slide-1-b.jpg";
import Slide2 from "assets/images/slide-2-b.jpg";
export default function SlideBookSection1() {
  return (
    <div>
      <section className={styles.section}>
        <div className={`${styles.container_wrapper} main-container`}>
          <div className={styles.content_container}>
            <div className={styles.container}>
              <div id={styles.slide}>
                <div
                  className={styles.item}
                  style={{ backgroundImage: `url(${Slide1})` }}
                >
                  <div className={styles.content}>
                    <div className={styles.name}>Slide 1</div>
                    <div className={styles.des}>description slider 1</div>
                    <button>See more</button>
                  </div>
                </div>
                <div
                  className={styles.item}
                  style={{ backgroundImage: `url(${Slide2})` }}
                >
                  <div className={styles.content}>
                    <div className={styles.name}>Slide 2</div>
                    <div className={styles.des}>description slider 2</div>
                    <button>See more</button>
                  </div>
                </div>
              </div>

              <div className={styles.buttons}>
                <button id={styles.prev}>{"<"}</button>
                <button id={styles.next}>{">"}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
