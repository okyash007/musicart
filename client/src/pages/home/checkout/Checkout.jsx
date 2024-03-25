import React, { useState } from "react";
import { useSelector } from "react-redux";
import PlaceOrder from "./PlaceOrder";
import OrderDetails from "../../../components/order-details/OrderDetails";
import OrderSummary from "../../../components/order-details/order-summary/OrderSummary";
import styles from "./checkout.module.css";
import Payment from "./payment/Payment";

const Checkout = () => {
  const cart = useSelector((store) => store.cart);
  const [formData, setFormData] = useState({
    payment: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    payment: "",
    address: "",
  });

  function changeFormData(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  function validateFormData() {
    if (!formData.address.trim()) {
      setErrors((prev) => ({ ...prev, address: "Address is required" }));
    } else {
      setErrors((prev) => ({ ...prev, address: "" }));
    }
    if (!formData.payment) {
      setErrors((prev) => ({ ...prev, payment: "Payment is required" }));
    } else {
      setErrors((prev) => ({ ...prev, payment: "" }));
    }
  }

  if (cart.items.length === 0 || cart.id === null) {
    return <h1 className={styles.noitems}>No items in cart</h1>;
  }

  return (
    <div className={styles.bg}>
      <div>
        <OrderDetails
          cart={cart.items}
          address={
            <>
              <textarea
                onChange={(e) => {
                  changeFormData("address", e.target.value);
                }}
                className={styles.address}
              ></textarea>
              {errors.address && (
                <p className={styles.error}>{errors.address}</p>
              )}
            </>
          }
          payment={
            <div>
              <Payment
                changeFormData={changeFormData}
                payment={formData.payment}
              />
              {errors.payment && (
                <p className={styles.error}>{errors.payment}</p>
              )}
            </div>
          }
        />
      </div>
      <div className={styles.summary}>
        <div
          className={styles.placeorder}
          onClick={() => {
            validateFormData();
          }}
        >
          {formData.payment && formData.address.trim() ? (
            <PlaceOrder address={formData.address} payment={formData.payment} />
          ) : (
            <button className={"button1"+ " " + styles.place}>
              Place order
            </button>
          )}
        </div>
        <p className={styles.text}>
          By placing your order, you agree to Musicart privacy notice and
          conditions of use.
        </p>
        <OrderSummary total={totalPrice} />
      </div>
    </div>
  );
};

export default Checkout;
