/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import useGoogle from "@/hooks/useGoogle";
import BtnLoginGG from "./btn_login_gg";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
export default function RegisterPage() {
  const { state: routerState } = useLocation();
  const { register } = useAuth();
  const { loginGoogle, setIsLoading, isLoading, error, userInfo } = useGoogle();
  const handleSubmit = ({ typeLogin }, value) => {
    if (typeLogin == "GOOGLE") {
      const data = {
        typeLogin,
        fullname: userInfo.inforUser.name,
        email: userInfo.inforUser.email,
        password: userInfo.access_token,
      };
      register(data);
    } else {
      const data = {
        typeLogin: "EMAIL",
        fullname: value.fullname,
        email: value.email,
        password: value.password,
      };
      register(data);
    }
  };
  const SignupSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required("Required"),
    confirmPass: Yup.string()
      .oneOf([Yup.ref("password"), null], 'Must match "password" field value')
      .required("Required"),
  });
  useEffect(() => {
    if (
      !(error == undefined && isLoading == undefined) &&
      !error &&
      !isLoading
    ) {
      handleSubmit({ typeLogin: "GOOGLE" });
    }
  }, [isLoading]);
  return (
    <>
      <section className={styles.nav_section}></section>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.wrapper} main-container`}>
            <h2 className={styles.title}>register</h2>
            <div className="flex flex-col items-center">
              <BtnLoginGG
                googleLogin={loginGoogle}
                setIsLoading={setIsLoading}
              />
            </div>
            <div className="flex justify-center w-full items-center">
              <div className="my-5 border rounded-md border-gray-200 max-w-xs h-1 w-full bg-gray-400"></div>
            </div>
            <Formik
              initialValues={{
                fullname: "",
                email: "",
                password: "",
                confirmPass: "",
              }}
              onSubmit={(e) => handleSubmit({ typeLogin: "EMAIL" }, e)}
              validationSchema={SignupSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className={styles.form}
                  autoComplete="off"
                >
                  <label className={styles.label}>
                    <span>Fullname:</span>
                    <input
                      style={{
                        borderColor:
                          errors.fullname && touched.fullname ? "red" : "",
                      }}
                      className={`${styles.input} focus:outline-none focus:ring-transparent`}
                      type="text"
                      name="fullname"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.fullname && touched.fullname && (
                      <div className="text-left -mt-10 mb-4 ml-2">
                        <p className="font-medium text-red-600 text-base ">
                          {errors.fullname}
                        </p>
                      </div>
                    )}
                  </label>

                  <label className={styles.label}>
                    <span>Email:</span>
                    <input
                      style={{
                        borderColor: errors.email && touched.email ? "red" : "",
                      }}
                      className={`${styles.input} focus:outline-none focus:ring-transparent`}
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <div className="text-left -mt-10 mb-4 ml-2">
                        <p className="font-medium text-red-600 text-base ">
                          {errors.email}
                        </p>
                      </div>
                    )}
                  </label>
                  <label className={styles.label}>
                    <span>Password:</span>
                    <input
                      style={{
                        borderColor:
                          errors.password && touched.password ? "red" : "",
                      }}
                      className={`${styles.input} focus:outline-none focus:ring-transparent`}
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password && (
                      <div className="text-left -mt-10 mb-4 ml-2">
                        <p className="font-medium text-red-600 text-base ">
                          {errors.password}
                        </p>
                      </div>
                    )}
                  </label>
                  <label className={styles.label}>
                    <span>Confirm password:</span>
                    <input
                      style={{
                        borderColor:
                          errors.confirmPass && touched.confirmPass
                            ? "red"
                            : "",
                      }}
                      className={`${styles.input} focus:outline-none focus:ring-transparent`}
                      type="password"
                      name="confirmPass"
                      value={values.confirmPass}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirmPass && touched.confirmPass && (
                      <div className="text-left -mt-10 mb-4 ml-2">
                        <p className="font-medium text-red-600 text-base ">
                          {errors.confirmPass}
                        </p>
                      </div>
                    )}
                  </label>
                  <div className="flex justify-center items-center">
                    <button
                      className={styles.button}
                      type="submit"
                      disabled={isLoading}
                    >
                      Register
                    </button>
                  </div>
                </form>
              )}
            </Formik>
            <p className={styles.login}>
              Already have an account?{" "}
              <Link to="/login" state={routerState} className="underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
