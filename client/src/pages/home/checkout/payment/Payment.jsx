import React from "react";
import DropDown from "../../../../components/dropdown/DropDown";
import styles from "./payment.module.css";

const Payment = ({ changeFormData, payment }) => {
  return (
    <DropDown button={<div className={styles.button}>{payment ? payment : "Mode of payment"}</div>}>
      <div className={styles.content}>
        <p
          onClick={() => {
            changeFormData("payment", "Cash On Delivery");
          }}
        >
          Pay On Delivery
        </p>
        <p
          onClick={() => {
            changeFormData("payment", "UPI");
          }}
        >
          UPI
        </p>
        <p
          onClick={() => {
            changeFormData("payment", "Card");
          }}
        >
          Card
        </p>
      </div>
    </DropDown>
  );
};

export default Payment;
