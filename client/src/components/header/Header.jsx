import React from "react";
import styles from "./header.module.css";
import { BiSolidPhoneCall } from "react-icons/bi";

const Header = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.phone}>
        <BiSolidPhoneCall size={20} />
        912121131313
      </div>
      <div>Get 50% off on selected items | Shop Now </div>
      <div>Login | Signup</div>
    </div>
  );
};

export default Header;
