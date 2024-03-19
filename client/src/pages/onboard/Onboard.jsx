import React from "react";
import logo from "../../assets/logo.png";
import Footer from "../../components/footer/Footer";
import styles from "./onboard.module.css";
import Login from "./login-signup/Login";
import Signup from "./login-signup/Signup";
import Logo from "../../components/logo/Logo";

const Onboard = () => {
  return (
    <>
      <div className={styles.bg}>
        <Logo />
        <Signup />
      </div>
      <Footer />
    </>
  );
};

export default Onboard;
