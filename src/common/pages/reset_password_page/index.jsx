import { useState } from "react";
import styles from "./index.module.scss";
import InputCode from "./input_code";
import FormResetPass from "./form_reset_pass";

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
      <section className={styles.nav_section}></section>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.wrapper} main-container`}>
            {checkCode ? (
              <InputCode handleChange={handleChange} />
            ) : (
              <FormResetPass code={getCode} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
