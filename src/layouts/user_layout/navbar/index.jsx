import { NavLink } from "react-router-dom";
import {
  ShoppingBagIcon,
  HeartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { BiLogIn, BiSearch } from "react-icons/bi";
import Logout from "./Logout";
import MenuNav from "./MenuNav";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { isLoggedIn: isUserValid } = useSelector((state) => state.auth);
  const { wishlist, cart } = useSelector((state) => state.userStore);

  return (
    <header>
      <div className="fixed top-0 left-0 right-0 z-30 py-2  bg-gray-900 p-10 ">
        <div
          aria-label="Top"
          className="px-4  w-full sm:px-6 lg:px-8 relative "
        >
          <div className="flex items-center justify-between h-10 flex-1 ">
            <div className="flex items-center justify-end w-full">
              <div className="flex flex-1 overflow-hidden sm:ml-4 md:w-1/12 lg:ml-0">
                <NavLink to="/">
                  <p className=" text-2xl text-white font-bold">
                    The Book Shelf
                  </p>
                </NavLink>
              </div>
              <div className="flex items-center justify-end w-4/5 ">
                <div className="flex justify-end w-3/4 ">
                  <NavLink
                    className="ml-4 md:flow-root lg:ml-6 "
                    to={"/products"}
                  >
                    <div className="flex items-center p-2 -m-2 group ">
                      {/* <MenuNav /> */}
                      <p className="text-white font-bold underline">Store</p>
                    </div>
                  </NavLink>
                  <span
                    className="w-px h-6 ml-4 bg-gray-700 lg:ml-6"
                    aria-hidden="true"
                  />
                  <div className="ml-4 md:flow-root lg:ml-6">
                    <NavLink
                      to="search"
                      className="flex items-center p-2 -m-2 group"
                    >
                      <BiSearch
                        className="flex-shrink-0 w-6 h-6 text-gray-100 group-hover:text-white"
                        aria-hidden="true"
                      />
                      <span className="sr-only">search</span>
                    </NavLink>
                  </div>
                  <span
                    className="w-px h-6 ml-4 bg-gray-700 lg:ml-6"
                    aria-hidden="true"
                  />

                  <div
                    className={`flow-root ml-4 lg:ml-6 ${
                      isUserValid ? "" : "opacity-40"
                    }`}
                  >
                    <NavLink
                      to={!isUserValid ? "#" : "wishlist"}
                      className="flex items-center p-2 -m-2 group"
                    >
                      <HeartIcon
                        className="flex-shrink-0 w-6 h-6 text-gray-100 group-hover:text-white"
                        aria-hidden="true"
                      />
                      <span className="ml-1 text-xs font-medium text-gray-100 sm:ml-2 sm:text-sm group-hover:text-gray-50">
                        {isUserValid && wishlist.length}
                      </span>
                      <span className="sr-only">favorite items view</span>
                    </NavLink>
                  </div>
                  <span
                    className="w-px h-6 ml-4 bg-gray-700 lg:ml-6"
                    aria-hidden="true"
                  />
                  <div
                    className={`flow-root ml-4 lg:ml-6 ${
                      isUserValid ? "" : "opacity-40"
                    }`}
                  >
                    <NavLink
                      to={!isUserValid ? "#" : "cart"}
                      className="flex items-center p-2 -m-2 group"
                    >
                      <ShoppingBagIcon
                        className="flex-shrink-0 w-6 h-6 text-gray-100 group-hover:text-gray-50"
                        aria-hidden="true"
                      />
                      <span className="ml-1 text-xs font-medium text-gray-100 sm:ml-2 sm:text-sm group-hover:text-gray-50">
                        {isUserValid && cart.length}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </NavLink>
                  </div>
                  {isUserValid && (
                    <>
                      <span
                        className="w-px h-6 ml-4 bg-gray-700 lg:ml-6"
                        aria-hidden="true"
                      />
                      <div className="ml-4 md:flow-root lg:ml-6">
                        <NavLink
                          to="account"
                          className="flex items-center p-2 -m-2 group"
                        >
                          <UserCircleIcon
                            className="flex-shrink-0 w-6 h-6 text-gray-100 group-hover:text-white"
                            aria-hidden="true"
                          />
                          <span className="sr-only">user profile view</span>
                        </NavLink>
                      </div>
                    </>
                  )}
                  {isUserValid && (
                    <>
                      <span
                        className="block w-px h-6 ml-4 bg-gray-700 lg:ml-6"
                        aria-hidden="true"
                      />
                      <div className="flow-root ml-4 lg:ml-6">
                        <Logout />
                      </div>
                    </>
                  )}
                  {!isUserValid && (
                    <>
                      <span
                        className="hidden w-px h-6 ml-4 bg-gray-700 md:block lg:ml-6"
                        aria-hidden="true"
                      />
                      <div className="flow-root ml-4 lg:ml-6">
                        <NavLink
                          to="login"
                          className="flex items-center p-2 px-3 py-2 -m-2 text-sm font-medium text-gray-100 rounded-lg hover:bg-gray-50 hover:bg-opacity-10 hover:text-white group"
                        >
                          <span className="hidden mr-2 md:block">Log In</span>
                          <BiLogIn
                            title="log in"
                            className="flex-shrink-0 w-6 h-6 ml-2 text-gray-100 group-hover:text-white"
                            aria-hidden="true"
                          />
                        </NavLink>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
