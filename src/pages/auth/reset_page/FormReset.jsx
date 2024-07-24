/* eslint-disable react/prop-types */

import { Formik } from "formik";
import * as Yup from "yup";
import { InputForm } from "../../../components";
import { useAuth } from "../../../hooks";
export default function FormReset({ code }) {
  const { resetPassword } = useAuth();
  const handleSubmit = (e) => {
    resetPassword({ new_password: e.newPass, code });
  };

  const ResetSchema = Yup.object().shape({
    newPass: Yup.string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required("Required"),
    confirmPass: Yup.string()
      .oneOf([Yup.ref("newPass"), null], 'Must match "password" field value')
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
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl">
            Sign in to your account
          </h1>

          <div className="relative">
            <InputForm
              title={"new password"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.newPass}
              error={errors.newPass}
              touched={touched.newPass}
              name={"newPass"}
              isPassword={true}
              isRegister={true}
            />
          </div>
          <div className="relative">
            <InputForm
              isRegister={true}
              isPassword={true}
              title={"confirm password"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmPass}
              error={errors.confirmPass}
              touched={touched.confirmPass}
              name={"confirmPass"}
            />
          </div>
          <button
            type="submit"
            className="w-full px-5 py-2.5 text-xs lg:text-sm font-medium text-center text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}
