import React from "react";
import styles from "./header.module.css";
import { BiSolidPhoneCall } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((store) => store.user.data);

  return (
    <div className={styles.bg}>
      <div className={styles.phone}>
        <BiSolidPhoneCall size={20} />
        912121131313
      </div>
      <div>Get 50% off on selected items | Shop Now </div>
      <div className={styles.links}>
        {!user && (
          <>
            <Link to={"/login"}>Login</Link> |{" "}
            <Link to={"/signup"}>Signup</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
