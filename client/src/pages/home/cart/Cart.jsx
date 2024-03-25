import React from "react";
import styles from "./cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import Item from "./item/Item";
import { makePostRequest } from "../../../api/makePostRequest";
import { setItems } from "../../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((store) => store.cart);

  const totalQuantity = cart.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (cart.items.length === 0 || cart.id === null) {
    return <h1 className={styles.noitems}>no items in cart</h1>;
  }

  return (
    <div className={styles.bg}>
      <h1 className={styles.heading}> My Cart</h1>
      <div className={styles.content}>
        <div className={styles.itemsbox}>
          <div className={styles.items}>
            {cart.items.map((m) => (
              <Item key={m.product._id} item={m} />
            ))}
          </div>
          <div className={styles.footer}>
            <p>{`${totalQuantity} Items`}</p>
            <p>{`₹ ${totalPrice}`}</p>
          </div>
        </div>
        <div className={styles.details}>
          <h3>PRICE DETAILS</h3>
          <div className={styles.list}>
            <div className={styles.keys}>
              <p>Total MRP</p>
              <p>Discount on MRP</p>
              <p>Convenience Fee</p>
              <h3 className={styles.total}>Total Amount</h3>
            </div>
            <div className={styles.value}>
              <p>{"₹ " + totalPrice}</p>
              <p>₹ 0</p>
              <p>₹ 45</p>
              <h3 className={styles.total}>₹ {totalPrice + 45}</h3>
            </div>
          </div>
          <button
            className={styles.checkout + " " + "button1"}
            onClick={() => {
              if (cart.items.length > 0) {
                navigate("/checkout");
              }
            }}
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
