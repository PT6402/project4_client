/* eslint-disable react/prop-types */
import { Formik } from "formik";
import { createContext } from "react";
const FormikContextMini = createContext();
export { FormikContextMini };
export default function FormikLayout({
  onSubmit,
  children,
  className,
  initialValues,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      // onSubmit={(values, { setSubmitting }) => {
      //   setTimeout(() => {
      //     alert(JSON.stringify(values, null, 2));
      //     setSubmitting(false);
      //   }, 400);
      // }}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => {
        return (
          <FormikContextMini.Provider
            value={{
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
            }}
          >
            <form onSubmit={handleSubmit} className={className}>
              {children}
              {/* <button type="submit" disabled={isSubmitting}>
                Submit
              </button> */}
            </form>
          </FormikContextMini.Provider>
        );
      }}
    </Formik>
  );
}
