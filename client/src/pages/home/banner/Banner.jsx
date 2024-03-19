import React from "react";
import styles from "./banner.module.css";
import girl from "../../../assets/girl.png";

const Banner = () => {
  return (
    <div className={styles.bg}>
      <h1 className={styles.heading}>
        Grab upto 50% off on <br/> Selected headphones
      </h1>
      <img src={girl} alt="" className={styles.girl} />
    </div>
  );
};

export default Banner;
