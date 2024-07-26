import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer";

const UserLayout = () => {
  return (
    <div className="bg-gray-900  ">
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-gray-900  overflow-y-scroll no-scrollbar ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
