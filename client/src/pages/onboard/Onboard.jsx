import React from "react";
import logo from "../../assets/logo.png";
import Footer from "../../components/footer/Footer";
import styles from "./onboard.module.css";
import Login from "./login-signup/Login";
import Signup from "./login-signup/Signup";

const Onboard = () => {
  return (
    <>
      <div className={styles.bg}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
          <h1>Musicart</h1>
        </div>
        <Signup />
      </div>
      <Footer />
    </>
  );
};

export default Onboard;
