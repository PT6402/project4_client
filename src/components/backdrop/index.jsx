/* eslint-disable react/prop-types */
import styles from "./index.module.scss";
import { motion } from "framer-motion";

const Backdrop = ({ backdropClassName }) => {
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
};

export default Backdrop;
