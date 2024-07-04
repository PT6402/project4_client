/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
export default function ItemStep({ level, size = 5 }) {
  const { currentStep } = useSelector((state) => state.formStore);
  const [active, setActive] = useState(false);
  const handleCheckStatus = () => {
    if (currentStep == level) {
      setActive(true);
    } else if (level < currentStep) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  useEffect(() => {
    handleCheckStatus();
  }, [currentStep]);
  return (
    <>
      <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group">
        <span
          className={`min-w-${size} min-h-${size} group inline-flex items-center text-xs align-middle`}
        >
          <span
            className={`size-${size} flex justify-center items-center flex-shrink-0  font-medium text-gray-800 rounded-full group-focus:bg-gray-200 ${
              active ? "bg-indigo-500" : "bg-gray-100"
            } hs-stepper-active:text-white hs-stepper-success:bg-indigo-500 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600 `}
          >
            {level < currentStep ? (
              <span className=" text-lg p-2">
                <BsCheck size={32} color="white" />
              </span>
            ) : (
              <span
                className={`leading-6 text-lg px-5 py-3 ${
                  active ? "text-white" : ""
                }`}
              >
                {level}
              </span>
            )}
          </span>
          {/* <span className="ms-2  font-medium text-gray-800 text-lg">Step</span> */}
        </span>
        <div
          className={`w-full h-1 flex-1 ${
            level < currentStep ? "bg-indigo-500" : "bg-gray-100"
          } group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600 rounded-lg`}
        ></div>
      </li>
    </>
  );
}
