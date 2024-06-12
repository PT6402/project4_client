import { Outlet } from "react-router-dom";

import Toast from "./toast";
import Cart from "./cart";
import Header from "./header";
import Footer from "./footer";

export default function UserLayout() {
  return (
    <>
      <Toast />
      <div id="layout">
        <Cart />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
