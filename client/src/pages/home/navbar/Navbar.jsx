import React from "react";
import styles from "./navbar.module.css";
import Logo from "../../../components/logo/Logo";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.left}>
        <Logo />
        <p>Home</p>
      </div>
      <div>
        <Link to={"/cart"}>
          <button> view cart </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
