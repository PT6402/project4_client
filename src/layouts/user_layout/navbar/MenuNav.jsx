import { useState } from "react";
import { Transition } from "@headlessui/react";
import {
  BookOpenIcon,
  ChevronDownIcon,
  LockClosedIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { IoSearchCircleOutline } from "react-icons/io5";

export default function MenuNav() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className=" text-white"
      onMouseEnter={() => setOpen(false)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className="flex flex-row items-center w-full px-4 md:w-auto md:inline md:mt-0 cursor-pointer"
        onMouseLeave={() => setOpen(false)}
      >
        <span> Explore </span>
        <ChevronDownIcon
          className={`inline size-5 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <Transition
        show={open}
        enter="transition ease-out duration-75"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute z-10 w-full px-2 mt-3 left-0 right-0 sm:px-0">
          <div className="overflow-hidden rounded-lg shadow-md shadow-gray-700/20 ring-1 ring-black ring-opacity-5 border border-gray-600">
            <div className="relative grid gap-6 px-5 py-6 bg-gray-900 sm:gap-8 sm:p-8  ">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="grid grid-cols-1 gap-8">
                  <a
                    href="#_"
                    className="inline-flex items-start p-3 -m-3 transition duration-150 ease-in-out rounded-xl hover:bg-gray-50"
                  >
                    <IoSearchCircleOutline className="w-6 h-6 text-black" />
                    <div className="ml-4">
                      <p className="text-base font-medium text-black">
                        Explore design work
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Trending designs to inspire you
                      </p>
                    </div>
                  </a>
                  <a
                    href="#_"
                    className="inline-flex items-start p-3 -m-3 transition duration-150 ease-in-out rounded-xl hover:bg-gray-50"
                  >
                    <BookOpenIcon className="w-6 h-6 text-black" />
                    <div className="ml-4">
                      <p className="text-base font-medium text-black">Blog</p>
                      <p className="mt-1 text-sm text-gray-500">
                        Interviews, tutorials and more
                      </p>
                    </div>
                  </a>
                  <a
                    href="#_"
                    className="inline-flex items-start p-3 -m-3 transition duration-150 ease-in-out rounded-xl hover:bg-gray-50"
                  >
                    <LockClosedIcon className="w-6 h-6 text-black" />
                    <div className="ml-4">
                      <p className="text-base font-medium text-black">Secure</p>
                      <p className="mt-1 text-sm text-gray-500">
                        Interviews, tutorials and more
                      </p>
                    </div>
                  </a>
                  <a
                    href="#_"
                    className="inline-flex items-start p-3 -m-3 transition duration-150 ease-in-out rounded-xl hover:bg-gray-50"
                  >
                    <UserGroupIcon className="w-6 h-6 text-black" />
                    <div className="ml-4">
                      <p className="text-base font-medium text-black">Users</p>
                      <p className="mt-1 text-sm text-gray-500">
                        Trending designs to inspire you
                      </p>
                    </div>
                  </a>
                </div>
                <div className="grid grid-cols-1 gap-3 p-2 lg:p-0 bg-gray-50 rounded-2xl">
                  <div className="grid items-start h-full gap-6 px-5 py-6 sm:gap-8 sm:p-8">
                    <h3 className="text-base font-medium text-black">
                      Getting started
                    </h3>
                    <div className="space-y-2">
                      <a
                        href="#_"
                        className="flex items-start text-sm font-medium transition duration-150 ease-in-out rounded-lg hover:text-black"
                      >
                        Explore design work
                      </a>
                      <a
                        href="#_"
                        className="flex items-start text-sm text-gray-500 transition duration-150 ease-in-out rounded-lg hover:text-black"
                      >
                        Register
                      </a>
                      <a
                        href="#_"
                        className="flex items-start text-sm text-gray-500 transition duration-150 ease-in-out rounded-lg hover:text-black"
                      >
                        Adding users
                      </a>
                      <a
                        href="#_"
                        className="flex items-start text-sm text-gray-500 transition duration-150 ease-in-out rounded-lg hover:text-black"
                      >
                        Video Tutorials
                      </a>
                      <a
                        href="#_"
                        className="flex items-start text-sm text-gray-500 transition duration-150 ease-in-out rounded-lg hover:text-black"
                      >
                        Libraries and SDKs
                      </a>
                      <a
                        href="#_"
                        className="inline-flex items-start text-sm text-gray-500 transition duration-150 ease-in-out rounded-lg hover:text-black"
                      >
                        Adding Plugins
                      </a>
                      <a
                        href="#_"
                        className="inline-flex items-start text-sm text-gray-500 transition duration-150 ease-in-out rounded-lg hover:text-black"
                      >
                        Dashboard templates
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
