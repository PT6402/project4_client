/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

export default function PricePackage({ packlist, price, handleGetOption }) {
  const [option, setOption] = useState({ type: "buy", packageId: null });
  const handleOnChangeOption = (value) => {
    setOption(value);
  };
  useEffect(() => {
    handleGetOption(option);
  }, [option]);
  return (
    <div>
      <ul className="items-center w-full text-sm font-medium text-gray-900    dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li
          className={`w-fit mb-2 border-transparent rounded-lg border-2 p-1 ${
            option.type == "buy" && "border-cyan-900"
          }`}
        >
          <div
            className={`flex items-center ps-3 ${
              option.type == "buy" ? "bg-cyan-900" : "bg-white"
            } pr-5 rounded-lg`}
          >
            <input
              id={`horizontal-list-radio-license price`}
              type="radio"
              value=""
              name="list-radio"
              onChange={() =>
                handleOnChangeOption({ type: "buy", packageId: null })
              }
              checked={option.type == "buy"}
              className="w-0 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 collapse"
            />
            <label
              htmlFor={`horizontal-list-radio-license price`}
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex justify-center items-center"
            >
              <p
                className={`mr-1 ${
                  option.type == "buy" ? "text-white" : "text-black"
                } `}
              >
                Buy -
              </p>
              <span
                className={`text-md before:mr-1 before:content-['$'] font-medium  title-font ${
                  option.type == "buy" ? "text-white" : "text-black"
                } `}
              >
                {price}
              </span>
            </label>
          </div>
        </li>
        {/* <li
          className={`w-fit mb-2 border-transparent rounded-lg border-2 p-1 ${
            option.type == "package" && "border-cyan-900"
          }`}
        >
          <div className="flex items-center ps-3 bg-white pr-5 rounded-lg">
            <input
              id={`horizontal-list-radio-license package`}
              type="radio"
              value=""
              name="list-radio"
              onChange={() =>
                handleOnChangeOption({ type: "package", packageId: null })
              }
              checked={option.type == "package"}
              className="w-0 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 collapse"
            />
            <label
              htmlFor={`horizontal-list-radio-license package`}
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex justify-center items-center"
            >
              <p className="mr-1">Package</p>
            </label>
          </div>
        </li> */}
      </ul>

      {
        <ul className="items-center w-full text-sm font-medium text-gray-900   rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ml-1 -mt-1.5">
          {packlist?.length > 0 &&
            packlist.map((packageItem, i) => (
              <li
                key={i}
                className={`w-full border ${
                  i == 0
                    ? "rounded-t-md"
                    : i == packlist.length - 1
                    ? "rounded-b-md"
                    : ""
                } border-transparent ${
                  option.packageId == i ? "bg-cyan-900" : "bg-white"
                } `}
              >
                <div className="flex items-center ps-3">
                  <input
                    id={`horizontal-list-radio-license ${i}`}
                    type="radio"
                    name="list-radio-package"
                    onChange={() =>
                      handleOnChangeOption({
                        type: "package",
                        packageId: i,
                      })
                    }
                    checked={option.packageId == i}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={`horizontal-list-radio-license ${i}`}
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    <div
                      className={`${
                        option.type == "package" && option.packageId == i
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      <span className="p-2">{packageItem.packageName}</span>-
                      <span className="p-2">{packageItem.dayQuantity} day</span>
                      -<span className="p-2">${packageItem.rentPrice}</span>
                    </div>
                  </label>
                </div>
              </li>
            ))}
        </ul>
      }
    </div>
  );
}
