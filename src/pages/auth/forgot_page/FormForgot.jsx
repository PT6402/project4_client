import { Formik } from "formik";
import { useAuth } from "../../../hooks";
import * as Yup from "yup";
import { InputForm } from "../../../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function FormForgot() {
  const { forgotPassword, isLoading } = useAuth();
  const {
    inforUser: { email },
  } = useSelector((state) => state.userStore);
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
      <Formik
        initialValues={{ email: email || "" }}
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
            className="space-y-4 md:space-y-6"
            autoComplete="off"
          >
            <InputForm
              title={"email for reset"}
              name={"email"}
              error={errors.email}
              touched={touched.email}
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <button
              className="w-full px-5 py-2.5 text-xs lg:text-sm font-medium text-center text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
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
            <p className="text-sm font-light text-gray-400">
              No account?
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
