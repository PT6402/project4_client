/* eslint-disable no-unused-vars */
import { useRef } from "react";
import styles from "./index.module.scss";
import { Button } from "@/common/components";
export default function NewsLetter() {
  const emailInputRef = useRef();
  const scrollToRef = useRef();

  const scrollTo = () => {
    scrollToRef.current.scrollIntoView();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;
    console.log(email);
    // await subscribeToNewsletter({ email });
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <h3 className={styles.title}>Sign up for the newsletter</h3>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            ref={scrollToRef}
          >
            <>
              <input
                className={`${styles.input} focus:ring-0 focus:outline-none `}
                placeholder="Your email address"
                type="email"
                ref={emailInputRef}
                required
              />
              <Button className={`${styles.button} `}>
                <div className="flex h-full justify-center items-center">
                  Sign in
                </div>
              </Button>
            </>
          </form>
        </div>
      </section>
    </>
  );
}
