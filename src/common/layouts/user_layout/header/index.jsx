/* eslint-disable react/prop-types */
import { DrawerModal } from "@/common/components";
import Nav from "./nav";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavDrawerBottom from "./nav_drawer_bottom";

export default function Header({ openCartModal }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  const isBigScreen = useMediaQuery({
    query: "(min-width: 900px)",
  });

  useEffect(() => {
    if (isBigScreen && isOpen) {
      setIsOpen(false);
    }
  }, [isBigScreen]);
  return (
    <header>
      <DrawerModal motionKey="nav-drawer" close={() => setIsOpen(false)}>
        {isOpen && <NavDrawerBottom toggleSideNav={toggleSideNav} />}
      </DrawerModal>
      <Nav toggleSideNav={toggleSideNav} openCartModal={openCartModal} />
    </header>
  );
}
