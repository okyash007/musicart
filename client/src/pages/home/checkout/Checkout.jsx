import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
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

  function changeFormData(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (cart.items.length === 0 || cart.id === null) {
    return <Navigate to={"/cart"} replace={true} />;
  }

  return (
    <div className={styles.bg}>
      <div>
        <OrderDetails
          cart={cart.items}
          address={<textarea className={styles.address}></textarea>}
          payment={
            <Payment
              changeFormData={changeFormData}
              payment={formData.payment}
            />
          }
        />
      </div>
      <div className={styles.summary}>
        <PlaceOrder />
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
