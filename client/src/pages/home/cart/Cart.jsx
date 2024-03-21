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

  return (
    <div className={styles.bg}>
      <h1 className={styles.heading}> My Cart</h1>
      <div className={styles.content}>
        <div className={styles.itemsbox}>
          <div className={styles.items}>
            {cart.items.length === 0 ? (
              <h1>No items in Cart</h1>
            ) : (
              cart.items.map((m) => <Item key={m.product._id} item={m} />)
            )}
          </div>
          <div className={styles.footer}>
            <p>{`${totalQuantity} Items`}</p>
            <p>{`₹ ${totalPrice}`}</p>
          </div>
        </div>
        <div className={styles.details}>
          <p>PRODUCT DETAILS</p>
          <button
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
