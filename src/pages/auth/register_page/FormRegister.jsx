import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks";
import * as Yup from "yup";
import { Formik } from "formik";
import { InputForm } from "../../../components";
import BtnLoginGG from "./BtnLoginGG";
export default function FormRegister() {
  const fullnameInput = useRef();
  const { register } = useAuth();
  const handleSubmit = (value) => {
    const data = {
      name: value.fullname,
      email: value.email,
      password: value.password,
    };
    register(data).then((res) => {
      if (res?.errorExist) {
        fullnameInput.current.focus();
        value.fullname = "";
        value.email = "";
        value.password = "";
        value.confirmPass = "";
      }
    });
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

  return (
    <>
      <BtnLoginGG />
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          password: "",
          confirmPass: "",
        }}
        onSubmit={(e) => handleSubmit(e)}
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
            className="space-y-4 md:space-y-6"
            autoComplete="off"
          >
            <InputForm
              title={"fullname"}
              onBlur={handleBlur}
              onChange={handleChange}
              name={"fullname"}
              value={values.fullname}
              error={errors.fullname}
              touched={touched.fullname}
            />
            <InputForm
              title={"email"}
              onBlur={handleBlur}
              onChange={handleChange}
              name={"email"}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />
            <div className="relative">
              <InputForm
                title={"password"}
                onBlur={handleBlur}
                onChange={handleChange}
                name={"password"}
                value={values.password}
                error={errors.password}
                touched={touched.password}
                isRegister={true}
                isPassword={true}
              />
            </div>
            <div className="relative">
              <InputForm
                title={"confirm password"}
                onBlur={handleBlur}
                onChange={handleChange}
                name={"confirmPass"}
                value={values.confirmPass}
                error={errors.confirmPass}
                touched={touched.confirmPass}
                isPassword={true}
                isRegister={true}
              />
            </div>

            <button
              type="submit"
              className="w-full px-5 py-2.5 text-xs lg:text-sm font-medium text-center text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
            >
              Create Account
            </button>
            <p className="text-sm font-light text-gray-400">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 font-medium text-gray-100 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        )}
      </Formik>
    </>
  );
}
