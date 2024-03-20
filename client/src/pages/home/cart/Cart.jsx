import React from "react";
import styles from "./cart.module.css";
import { useSelector } from "react-redux";
import Item from "./item/Item";

const Cart = () => {
  const items = useSelector((store) => store.cart.items);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = items.reduce((acc, item) => acc + item.product.price, 0);

  return (
    <div className={styles.bg}>
      <h1 className={styles.heading}> My Cart</h1>
      <div className={styles.content}>
        <div className={styles.itemsbox}>
          <div className={styles.items}>
            {items.length === 0 ? (
              <h1>No items in Cart</h1>
            ) : (
              items.map((m) => <Item key={m.product._id} item={m} />)
            )}
          </div>
          <div className={styles.footer}>
            <p>{`${totalQuantity} Items`}</p>
            <p>{`₹ ${totalPrice}`}</p>
          </div>
        </div>
        <div className={styles.details}>
          <p>PRODUCT DETAILS</p>
          <button>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
