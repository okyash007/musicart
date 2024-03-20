import React from "react";
import styles from "./item.module.css";

const Item = ({ item }) => {
  return (
    <div className={styles.bg}>
      <img src={item.product.images[0]} alt="" />
      <div>
        <p>{`${item.product.brand} ${item.product.name}`}</p>
        <p>{`Color ${item.product.color}`}</p>
        <p>In Stock</p>
      </div>
      <div>
        <p>Price</p>
        <p>{`₹ ${item.product.price}`}</p>
      </div>
      <div>
        <p>Quantity</p>
        <p>{`${item.quantity}`}</p>
      </div>
      <div>
        <p>Total</p>
        <p>{`₹ ${item.product.price * item.quantity}`}</p>
      </div>
    </div>
  );
};

export default Item;
