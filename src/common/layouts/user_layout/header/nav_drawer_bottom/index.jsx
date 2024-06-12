/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import {
  FaFacebookF,
  FaInfoCircle,
  FaInstagram,
  FaQuestionCircle,
  FaUserCircle,
} from "react-icons/fa";
import { useEffect } from "react";
export default function NavDrawerBottom({ toggleSideNav }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.links_container}>
        <ul className={styles.links_list}>
          <h2>Products</h2>
          <li>
            <Link
              to="/collections/t-shirts"
              onClick={toggleSideNav}
              className={styles.link}
            >
              T-Shirts
            </Link>
          </li>
          <li>
            <Link
              to="/collections/hoodies-sweatshirts"
              onClick={toggleSideNav}
              className={styles.link}
            >
              Hoodies
            </Link>
          </li>
          <li>
            <Link
              to="/collections/accessories"
              onClick={toggleSideNav}
              className={styles.link}
            >
              Accessories
            </Link>
          </li>
        </ul>
        <ul className={styles.links_list}>
          <h2>Drops</h2>
          <li>
            <Link
              to="/collections/products"
              onClick={toggleSideNav}
              className={styles.link}
            >
              #001
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.info_container}>
        {/* {isVerified && <h2 className={styles.title}>Welcome back, {name}!</h2>} */}
        <ul className={styles.links_list}>
          <li>
            <Link to={"/login"} onClick={toggleSideNav} className={styles.link}>
              <i>
                <FaUserCircle />
              </i>
              Login
            </Link>
          </li>
          <li>
            <Link to="/" onClick={toggleSideNav} className={styles.link}>
              <i>
                <FaQuestionCircle />
              </i>
              Help Center
            </Link>
          </li>

          <li>
            <Link to="/" onClick={toggleSideNav} className={styles.link}>
              <i>
                <FaInfoCircle />
              </i>
              About Us
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.socials_container}>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>

        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebookF />
        </a>
      </div>
    </div>
  );
}
