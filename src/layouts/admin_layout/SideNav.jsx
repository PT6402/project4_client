/* eslint-disable react/prop-types */
import { Link, NavLink, useLocation } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { setUIAdminSidenav } from "../../context/uiSlice";

export function Sidenav({ brandName = "The book shelf", routes }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { adminSidenav } = useSelector((state) => state.uiConfig);
  const handleConfigSidenav = () => {
    dispatch(setUIAdminSidenav(false));
  };
  const sidenavType = "white";

  const handleColorBg = (index, active) => {
    if (index) {
      if (pathname == "/admin") {
        return "blue-gray";
      } else {
        return "white";
      }
    } else {
      return active ? "blue-gray" : "black";
    }
  };

  const handleVariant = (index, active) => {
    if (index) {
      if (pathname == "/admin") {
        return "gradient";
      } else {
        return "gradient";
      }
    } else {
      return active ? "gradient" : "text";
    }
  };
  return (
    <aside
      className={`bg-white shadow-sm ${
        adminSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={handleConfigSidenav}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path, index }) => (
              <li key={name}>
                {
                  <NavLink to={`/${layout}${index ? "" : "/"}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={handleVariant(index, isActive)}
                        color={handleColorBg(index, isActive)}
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                }
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

export default Sidenav;
