import React from "react";
import styles from "./ordersummary.module.css";

const OrderSummary = ({ total }) => {
  return (
    <div>
      <h2>Order Summary</h2>
      <div className={styles.list}>
        <p className={styles.lable}>Items : </p>
        <p className={styles.value}>{"₹ " + total}</p>
      </div>
      <div className={styles.list}>
        <p className={styles.lable}>Delivery : </p>
        <p className={styles.value}>₹ 45</p>
      </div>
      <div className={styles.list + " " + styles.total}>
        <h3 className={styles.lable}>Order total : </h3>
        <h3 className={styles.value}>{"₹ " + (total + 45)}</h3>
      </div>
    </div>
  );
};

export default OrderSummary;
