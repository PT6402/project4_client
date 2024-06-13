import { useRef, useState } from "react";
import styles from "./index.module.scss";
import InputCode from "./input_code";
import FormResetPass from "./form_reset_pass";

export default function ResetPasswordPage() {
  const [checkCode, setCheckCode] = useState(true);

  return (
    <>
      <section className={styles.nav_section}></section>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.wrapper} main-container`}>
            {checkCode ? <InputCode /> : <FormResetPass />}
          </div>
        </div>
      </section>
    </>
  );
}
