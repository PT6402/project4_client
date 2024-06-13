import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./index.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
const LoginPage = () => {
  const { state: routerState } = useLocation();
  const [checkTypeLogin, setCheckTypeLogin] = useState(true);

  const handleSubmit = (value) => {
    // e.preventDefault();
    console.log(value);
  };

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i, "Invalid email")
      .required(),
    password: Yup.string(),
  });
  return (
    <>
      <section className={styles.nav_section}></section>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.wrapper} main-container`}>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={handleSubmit}
              validationSchema={SigninSchema}
              validateOnChange={false}
              validateOnBlur={false}
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
                  <h2 className={styles.title}>Login Account</h2>
                  <label className={styles.label}>
                    <span>Email:</span>
                    <input
                      //   defaultValue={defaultValue?.email || ""}
                      className={`${styles.input} focus:outline-none focus:ring-transparent 
                          text-xs `}
                      style={{
                        borderColor: errors.email && touched.email ? "red" : "",
                      }}
                      name="email"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <div className="text-left -mt-10 mb-4 ml-2">
                        <p className="font-medium text-red-600  text-base ">
                          {errors.email}
                        </p>
                      </div>
                    )}
                  </label>
                  {checkTypeLogin && (
                    <label className={styles.label}>
                      <span>Password:</span>

                      <p className="text-right text-lg text-gray-600  -mt-7 mb-2 mr-3 relative -bottom-2">
                        <Link
                          to="/forgot-password"
                          className="font-medium text-gray-600 hover:text-gray-500 underline"
                        >
                          forgot password
                        </Link>
                      </p>
                      <input
                        style={{
                          borderColor:
                            errors.password && touched.password ? "red" : "",
                        }}
                        className={`${styles.input} focus:outline-none focus:ring-transparent 
                            text-xs `}
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        required={false}
                      />
                      {errors.password && touched.password && (
                        <div className="text-left -mt-10 mb-4 ml-2">
                          <p className="font-medium text-red-600  text-base ">
                            {errors.password}
                          </p>
                        </div>
                      )}
                    </label>
                  )}
                  <button
                    className={styles.button}
                    type="submit"
                    // disabled={!isValid && dirty}
                  >
                    {checkTypeLogin ? "Login" : "Submit"}
                  </button>
                </form>
              )}
            </Formik>
            <p className={styles.no_account}>
              Not member?{" "}
              <Link to="/register" state={routerState} className="underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
