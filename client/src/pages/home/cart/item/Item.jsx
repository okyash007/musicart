import React, { useState } from "react";
import styles from "./item.module.css";
import DropDown from "../../../../components/dropdown/DropDown";
import Loader from "../../../../components/loader/Loader";
import { useDispatch } from "react-redux";
import { setItems } from "../../../../store/cartSlice";
import { makePostRequest } from "../../../../api/makePostRequest";

const Item = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function addToCart(productId, quantity) {
    const data = await makePostRequest(
      `http://localhost:5000/api/v1/cart/add`,
      {
        productId,
        quantity,
      }
    );
    setLoading(false);
    if (data.success === true) {
      dispatch(setItems({ items: data.data.items, id: data.data._id }));
    }
  }

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
      <div className={styles.quantity}>
        <p>Quantity</p>
        {loading ? (
          <div className={styles.quantitybutton + " " + styles.loader}>
            <Loader color={"black"} size={"0.5rem"} />
          </div>
        ) : (
          <DropDown
            button={
              <div className={styles.quantitybutton}>{item.quantity}</div>
            }
          >
            <div className={styles.content}>
              {new Array(8)
                .fill()
                .map((_, index) => index + 1)
                .map((m) => (
                  <p
                    onClick={() => {
                      setLoading(true);
                      addToCart(item.product._id, m);
                    }}
                    key={m}
                  >
                    {m}
                  </p>
                ))}
            </div>
          </DropDown>
        )}
      </div>
      <div>
        <p>Total</p>
        <p>{`₹ ${item.product.price * item.quantity}`}</p>
      </div>
    </div>
  );
};

export default Item;
