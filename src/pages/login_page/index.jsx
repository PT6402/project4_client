/* eslint-disable react/no-unescaped-entities */
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  useLayoutEffect(() => {
    document.title = "Login | The Book Shelf";
  }, []);

  const submitHandlerFn = (e) => {
    e.preventDefault();
  };

  const changeHandlerFn = (e) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-32 overflow-hidden md:mt-0 md:h-screen lg:py-0">
          <div className="w-full bg-gray-800 border border-gray-700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl">
                Sign in to your account
              </h1>
              <form
                onSubmit={submitHandlerFn}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-100"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={loginState.email}
                    onChange={changeHandlerFn}
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-cyan-800 focus:border-cyan-800"
                    placeholder="abc@email.com"
                    required={true}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-100"
                  >
                    Password
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
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    minLength="6"
                    value={loginState.password}
                    onChange={changeHandlerFn}
                    placeholder="••••••••"
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-cyan-800 focus:border-cyan-800"
                    required={true}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-5 py-2.5 text-xs lg:text-sm font-medium text-center text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
                >
                  Sign in
                </button>

                <p className="text-sm font-light text-gray-400">
                  Don't have an account?
                  <Link
                    to="/create-account"
                    className="ml-1 font-medium text-gray-100 hover:underline"
                  >
                    Create Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
