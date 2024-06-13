/* eslint-disable react/prop-types */
import { Button } from "@/common/components";
import styles from "./index.module.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import { RiMenuLine } from "react-icons/ri";
import { CgSearch } from "react-icons/cg";
import { useEffect, useState } from "react";
import CartIcon from "./cart_icon";
export default function Nav({ toggleSideNav, openCartModal }) {
  const { pathname } = useLocation();
  const [hasScrolled, setHasSrolled] = useState(false);

  const resizeHeaderOnScroll = () => {
    setHasSrolled((hasScrolled) => {
      if (
        !hasScrolled &&
        (document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20)
      ) {
        return true;
      }

      if (
        hasScrolled &&
        document.body.scrollTop < 4 &&
        document.documentElement.scrollTop < 4
      ) {
        return false;
      }

      return hasScrolled;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", resizeHeaderOnScroll);

    return () => window.removeEventListener("scroll", resizeHeaderOnScroll);
  }, []);

  const handleOpenCartModal = () => {
    if (pathname !== "/cart") {
      openCartModal();
    }
  };

  const navStyles = hasScrolled
    ? `${styles.nav} ${styles.hasScrolled}`
    : styles.nav;
  return (
    <nav className={navStyles}>
      <div className={styles.container_top}>
        <Button className={`${styles.link} ${styles.info_link}`} type="button">
          Info
        </Button>
        <ul className={styles.info_list}>
          <li>
            <Link className={styles.link} to="/">
              Help Center
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/">
              Contact Us
            </Link>
          </li>
        </ul>

        <Link to="/login" className={`${styles.link} ${styles.login_link}`}>
          Login
        </Link>
      </div>
      <div className={styles.container_bottom}>
        <Link to="/">
          {/* <img className={styles.logo} src={LogoNav} alt="Logo Nav" /> */}
        </Link>
        <ul className={styles.links}>
          <li>
            <NavLink className={styles.link} to="/collections/t-shirts">
              T-shirts
            </NavLink>
          </li>
          <li>
            <NavLink
              className={styles.link}
              to="/collections/hoodies-sweatshirts"
            >
              Hoodies
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/collections/accessories">
              Accessories
            </NavLink>
          </li>
        </ul>
        <ul className={styles.icons_menu}>
          <li className={`${styles.search_icon} disabled-link`}>
            <CgSearch />
          </li>
          <li className={styles.cart_icon} onClick={handleOpenCartModal}>
            <CartIcon />
          </li>
          <li className={styles.mobile_icon}>
            <RiMenuLine onClick={toggleSideNav} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
