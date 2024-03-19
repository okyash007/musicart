import React from "react";
import styles from "./navbar.module.css";
import Logo from "../../../components/logo/Logo";

const Navbar = () => {
  return (
    <div className={styles.bg}>
      <div>
        <Logo />
        <p>Home</p>
      </div>
      <div>

      </div>
    </div>
  );
};

export default Navbar;
