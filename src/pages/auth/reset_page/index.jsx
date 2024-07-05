import { useState } from "react";
import FormCode from "./FormCode";
import FormReset from "./FormReset";

export default function ResetPasswordPage() {
  const [getCode, setGetCode] = useState();
  const [checkCode, setCheckCode] = useState(true);
  const handleChange = ({ status, code }) => {
    if (code) {
      setGetCode(code);
    }
    if (status) {
      setCheckCode(false);
    } else {
      setCheckCode(true);
    }
  };
  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-32 overflow-hidden md:mt-0 md:h-screen lg:py-0">
          <div className="w-full bg-gray-800 border border-gray-700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {checkCode ? (
                <FormCode handleChange={handleChange} />
              ) : (
                <FormReset code={getCode} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
