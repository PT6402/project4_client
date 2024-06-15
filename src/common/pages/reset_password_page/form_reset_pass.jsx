/* eslint-disable react/prop-types */
import useAuth from "@/hooks/useAuth";
import styles from "./index.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
export default function FormResetPass({ code }) {
  const { resetPassword } = useAuth();
  const handleSubmit = (e) => {
    resetPassword({ new_password: e.password, code });
  };

  const ResetSchema = Yup.object().shape({
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
  return (
    <Formik
      initialValues={{ newPass: "", confirmPass: "" }}
      validationSchema={ResetSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Reset pass</h2>

          <label className={styles.label}>
            <span>Password:</span>
            <input
              style={{
                borderColor: errors.password && touched.password ? "red" : "",
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
                  errors.confirmPass && touched.confirmPass ? "red" : "",
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
          <button className={styles.button} type="submit">
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}
