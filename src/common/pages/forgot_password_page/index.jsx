import styles from "./index.module.scss";
import { Link, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import useAuth from "@/hooks/useAuth";
import { useSelector } from "react-redux";
export default function ForgotPasswordPage() {
  const { state: routerState } = useLocation();
  const { forgotPassword, isLoading } = useAuth();
  const { inforUser } = useSelector((state) => state.userStore);
  const handleSubmit = (value) => {
    forgotPassword(value?.email).then((res) => {
      if (res?.errorNotFound) {
        value.email = "";
      }
    });
  };
  const ForgotSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  return (
    <>
      <section className={styles.nav_section}></section>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.wrapper} main-container`}>
            <Formik
              initialValues={{ email: inforUser?.email || "" }}
              onSubmit={handleSubmit}
              validationSchema={ForgotSchema}
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
                  <h2 className={styles.title}>send mail to reset pass</h2>
                  <label className={styles.label}>
                    <span>Email:</span>
                    <input
                      style={{
                        borderColor: errors.email && touched.email ? "red" : "",
                      }}
                      className={`${styles.input} focus:outline-none focus:ring-transparent `}
                      type="text"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <div className="text-left -mt-10 mb-4 ml-2">
                        <p className="font-medium text-red-600 text-base ">
                          {errors.email}
                        </p>
                      </div>
                    )}
                  </label>

                  <button
                    className={styles.button}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex space-x-2 justify-center items-center bg-black">
                        <span className="sr-only">Loading...</span>
                        <div className="h-5 w-5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-5 w-5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-5 w-5 bg-white rounded-full animate-bounce"></div>
                      </div>
                    ) : (
                      "Send"
                    )}
                  </button>
                </form>
              )}
            </Formik>
            <p className={styles.no_account}>
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
