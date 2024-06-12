import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import { useMediaQuery } from "react-responsive";
import NewsLetter from "./news_letter";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
export default function Footer() {
  const location = useLocation();

  const isBigScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isCollectionPage = location.pathname.includes("collections");

  return (
    <footer
      className={`${styles.footer} ${
        isCollectionPage && isBigScreen
          ? styles.is_collection_page_b
          : styles.is_collection_page_s
      }`}
    >
      {!isBigScreen && <NewsLetter />}
      <div className={styles.container}>
        <div className={styles.sitemap}>
          <div className={styles.nav_wrapper}>
            <h4 className={styles.nav_title}>Help</h4>
            <ul className={styles.nav}>
              <li>
                <Link to="/">Help Center</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className={styles.nav_wrapper}>
            <h4 className={styles.nav_title}>More</h4>
            <ul className={styles.nav}>
              <li>
                <Link to="">About Us</Link>
              </li>
              <li>
                <Link to="">Carreers</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.socials_wrapper}>
          {isBigScreen && <NewsLetter />}
          <div className={styles.socials}>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>

            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
