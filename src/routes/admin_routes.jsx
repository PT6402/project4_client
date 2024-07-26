import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  AdminAuthorPage,
  AdminCatetoriesPage,
  AdminHomePage,
  AdminUserPage,
  AdminPackagePage,
  StatisticsPage,
  AdminOrdersPage,
  OrderDetailPage,
  AdminPublishersPage
} from "../pages/admin";
import IconStarEmpty from "../components/icons/IconStarEmpty";
import AddAuthor from "../pages/admin/authors_page/AddAuthor";
import AddPackage from "../pages/admin/packages_page/AddPackage";
import AddPublisher from "../pages/admin/publishers_page/AddPublisher";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const admin_routes = [
  {
    title: "admin",
    layout: "admin",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "",
        index: true,
        element: <AdminHomePage />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "categories",
        path: "category",
        index: false,
        element: <AdminCatetoriesPage />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "authors",
        path: "author",
        index: false,
        element: <AdminAuthorPage />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "packages",
        path: "package",
        index: false,
        element: <AdminPackagePage />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "users",
        path: "user",
        index: false,
        element: <AdminUserPage />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "statistics",
        path: "statistics",
        index: false,
        element: <StatisticsPage />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "orders",
        path: "order",
        index: false,
        element: <AdminOrdersPage />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "publishers",
        path: "publisher",
        index: false,
        element: <AdminPublishersPage />,
      },
    ],
  },
];

export default admin_routes;
