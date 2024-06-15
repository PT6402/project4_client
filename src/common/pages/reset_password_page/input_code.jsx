/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function InputCode({ handleChange }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { inforUser } = useSelector((state) => state.userStore);
  const { checkCodeReset, error } = useAuth();
  function focusNextInput(el, prevId, nextId) {
    if (el.value.length === 0) {
      if (prevId) {
        document.getElementById(prevId).focus();
      }
    } else {
      if (nextId) {
        document.getElementById(nextId).focus();
      }
    }
  }

  const handleInputCode = () => {
    let flag = true;
    let code = "";
    const listInput = document.querySelectorAll("[data-focus-input-init]");
    for (let i = 0; i < listInput.length; i++) {
      listInput[i].addEventListener("keyup", function () {
        const prevId = this.getAttribute("data-focus-input-prev");
        const nextId = this.getAttribute("data-focus-input-next");
        focusNextInput(this, prevId, nextId);
      });
      if (listInput[i].value == "") {
        flag = false;
      } else {
        code += listInput[i].value;
      }
    }
    if (flag) {
      checkCodeReset({ code }).then((res) => {
        handleChange({ status: res, code });
      });
    }
  };
  const styleInput = `block w-16 h-16 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500  ${styles.input} sm:w-24 sm:h-24 sm:text-xl`;
  useEffect(() => {
    if (!(inforUser?.email && inforUser?.accessToken)) {
      navigate("/forgot-password");
    }
  }, [pathname]);

  useEffect(() => {
    if (error) {
      const listInput = document.querySelectorAll("[data-focus-input-init]");
      for (let i = 0; i < listInput.length; i++) {
        listInput[i].value = "";
        if (i == 0) {
          listInput[i].focus();
        }
      }
    }
  }, [error]);
  return (
    <div className=" mx-auto flex justify-start flex-col items-center">
      <Link to={"/forgot-password"} className={`${styles.arrow_button} `}>
        <FaArrowLeft />
      </Link>
      <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
        <div>
          <label htmlFor="code-1" className="sr-only">
            First code
          </label>
          <input
            type="number"
            maxLength="1"
            data-focus-input-init
            data-focus-input-next="code-2"
            id="code-1"
            className={styleInput}
            required
            onChange={() => handleInputCode()}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="code-2" className="sr-only">
            Second code
          </label>
          <input
            type="number"
            maxLength="1"
            data-focus-input-init
            data-focus-input-prev="code-1"
            data-focus-input-next="code-3"
            id="code-2"
            className={styleInput}
            required
            onChange={() => handleInputCode()}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="code-3" className="sr-only">
            Third code
          </label>
          <input
            type="number"
            maxLength="1"
            data-focus-input-init
            data-focus-input-prev="code-2"
            data-focus-input-next="code-4"
            id="code-3"
            className={styleInput}
            required
            onChange={() => handleInputCode()}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="code-4" className="sr-only">
            Fourth code
          </label>
          <input
            type="number"
            maxLength="1"
            data-focus-input-init
            data-focus-input-prev="code-3"
            id="code-4"
            className={styleInput}
            required
            onChange={() => handleInputCode()}
            autoComplete="off"
          />
        </div>
      </div>
      <p
        id="helper-text-explanation"
        className="mt-2 text-lg text-gray-500 dark:text-gray-400"
      >
        Please enter code we send email.
      </p>
      <p className="text-center text-gray-700 underline text-lg cursor-pointer">
        {" "}
        Or resend mail
      </p>
    </div>
  );
}
