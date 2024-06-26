/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import styles from "./index.module.scss";
export default function Backdrop({ backdropClassName }) {
  return (
    <motion.div
      key="backdrop"
      className={`${styles.backdrop} ${backdropClassName}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      exit={{ opacity: 0 }}
    />
  );
}
