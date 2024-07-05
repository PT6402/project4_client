import FormRegister from "./FormRegister";

const RegisterPage = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-32 sm:mt-0 md:h-screen lg:py-0">
        <div className="w-full bg-gray-800 border border-gray-700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl">
              Create an Account
            </h1>
            <FormRegister />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
