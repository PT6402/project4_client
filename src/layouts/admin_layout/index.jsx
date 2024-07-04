import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import DashboardNavbar from "./DashboardNavbar";
import Sidenav from "./SideNav";
import admin_routes from "../../routes/admin_routes";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-blue-gray-50">
      <Sidenav routes={admin_routes} />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Outlet />
        {/* <div className="text-blue-gray-600">
          <Footer />
        </div> */}
      </div>
    </div>
  );
}

export default AdminLayout;
