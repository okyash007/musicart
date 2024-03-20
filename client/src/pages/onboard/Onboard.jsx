import React from "react";
import Footer from "../../components/footer/Footer";
import styles from "./onboard.module.css";
import Logo from "../../components/logo/Logo";

const Onboard = ({ children }) => {
  return (
    <>
      <div className={styles.bg}>
        <Logo />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Onboard;
