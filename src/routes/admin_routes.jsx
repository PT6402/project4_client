import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  AdminAuthorPage,
  AdminCatetoriesPage,
  AdminHomePage,
  AdminUserPage,
  AdminPackagePage
} from "../pages/admin";
import IconStarEmpty from "../components/icons/IconStarEmpty";
import AddAuthor from "../pages/admin/authors_page/AddAuthor";
import AddPackage from "../pages/admin/packages_page/AddPackage";

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
    ],
  },
];

export default admin_routes;
