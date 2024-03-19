import React from "react";
import logo from "../../assets/logo.png";
import styles from './logo.module.css'

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="" />
      <h1>Musicart</h1>
    </div>
  );
  
};

export default Logo;
