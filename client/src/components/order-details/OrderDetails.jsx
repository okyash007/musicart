import React, { useState } from "react";
import styles from "./orderdetails.module.css";

const OrderDetails = ({ cart, address, payment }) => {
  const [seleted, setSelected] = useState(0);

  return (
    <div>
      <div className={styles.address}>
        <h1>1. Delivery address</h1>
        <div>
          <p>Yash Verma</p>
          {address}
        </div>
      </div>
      <div className={styles.payment}>
        <h1>2. Payment methord</h1>
        <div className={styles.paymentbox}>{payment}</div>
      </div>
      <div className={styles.cart}>
        <h1>3. Review items and delivery</h1>
        <div className={styles.cartbox}>
          <div className={styles.cartgrid}>
            {cart.map((m, i) => (
              <img
                key={m._id}
                onClick={() => {
                  setSelected(i);
                }}
                className={i === seleted ? styles.selected : ""}
                src={m.product.images[0]}
                alt={m.product.name}
              />
            ))}
          </div>
          <div>
            <h3>
              {cart[seleted].product.brand + " " + cart[seleted].product.name}
            </h3>
            <p>{"Color : " + cart[seleted].product.color}</p>
            <p>
              Delivery : Monday — FREE Standard
              <br />
              Delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
