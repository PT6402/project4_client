import { Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { InputForm } from "../../../components";
import { Link } from "react-router-dom";
import BtnLoginGG from "../register_page/BtnLoginGG";
import { useAuth } from "../../../hooks";
export default function FormLogin() {
  const { inforUser } = useSelector((state) => state.userStore);
  const { login } = useAuth();
  const handleSubmit = (value) => {
    login({
      email: value.email,
      password: value.password,
    }).then((res) => {
      if (res?.errorNotFound) {
        value.email = "";
        value.password = "";
      }

      if (res?.errorPassword) {
        value.password = "";
      }
    });
  };
  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i, "Invalid email")
      .required(),
    password: Yup.string().required("require password"),
  });

  return (
    <>
      <BtnLoginGG />
      <Formik
        initialValues={{ email: inforUser?.email || "", password: "" }}
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
            className="space-y-4 md:space-y-6"
            autoComplete="off"
          >
            <InputForm
              title={"your email"}
              onBlur={handleBlur}
              onChange={handleChange}
              name={"email"}
              value={values.email}
              error={errors.email}
              touched={touched.email}
              placeholder={"abc@gmail.com"}
            />

            {(() => {
              return (
                <div className={`relative `}>
                  <InputForm
                    title={"password"}
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={"••••••••"}
                    error={errors.password}
                    touched={touched.password}
                    isPassword={true}
                    name={"password"}
                  />
                </div>
              );
            })()}
            <button
              type="submit"
              className="w-full px-5 py-2.5 text-xs lg:text-sm font-medium text-center text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
            >
              {/* {checkTypeLogin ? "Login" : "Submit"} */} Login
            </button>

            <p className="text-sm font-light text-gray-400">
              No account?
              <Link
                to="/register"
                className="ml-1 font-medium text-gray-100 hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        )}
      </Formik>
    </>
  );
}
