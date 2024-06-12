/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
export default function Button({
  children,
  form,
  className,
  to,
  type,
  onClick,
  disabled,
}) {
  if (to) {
    return (
      <Link
        to={to}
        className={`${styles.button} ${className}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      form={form}
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
