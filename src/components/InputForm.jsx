/* eslint-disable react/prop-types */
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function InputForm({
  isPassword = false,
  isRegister = false,
  value,
  onChange,
  onBlur,
  error,
  touched,
  name,
  title,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);

  if (isPassword) {
    return (
      <div>
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-100"
        >
          {title}
        </label>

        {showPassword ? (
          <EyeIcon
            onClick={() => setShowPassword(false)}
            className="absolute w-6 h-6 text-gray-500 cursor-pointer right-2 bottom-2"
          />
        ) : (
          <EyeSlashIcon
            onClick={() => setShowPassword(true)}
            className="absolute w-6 h-6 text-gray-500 cursor-pointer right-2 bottom-2"
          />
        )}
        {!isRegister && (
          <p className="text-right text-md text-gray-600  -mt-7 mb-2 mr-3 relative -bottom-2">
            <Link
              to="/forgot-password"
              className="font-medium text-gray-600 hover:text-gray-500 underline"
            >
              forgot password
            </Link>
          </p>
        )}
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder="••••••••"
          className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-cyan-800 focus:border-cyan-800"
        />
        {error && touched && (
          <div className="ml-2">
            <p className="font-medium text-red-600  text-base ">{error}</p>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-100"
        >
          {title}
        </label>
        <input
          name={name}
          id={name}
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-cyan-800 focus:border-cyan-800"
          placeholder={placeholder}
        />
        {error && touched && (
          <div className="ml-2">
            <p className="font-medium text-red-600  text-base ">{error}</p>
          </div>
        )}
      </div>
    );
  }
}
