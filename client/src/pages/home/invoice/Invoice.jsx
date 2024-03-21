import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeGetRequest } from "../../../api/makeGetRequest";
import styles from "./invoice.module.css";
import OrderDetails from "../../../components/order-details/OrderDetails";
import OrderSummary from "../../../components/order-details/order-summary/OrderSummary";

const Invoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  async function getOrder() {
    const data = await makeGetRequest(
      `http://localhost:5000/api/v1/order/${id}`
    );
    if (data.success === true) {
      setInvoice(data.data);
    }
  }

  useEffect(() => {
    getOrder();
  }, []);

  if (!invoice) {
    return <></>;
  }

  const totalPrice = invoice.cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className={styles.bg}>
      <div>
        <OrderDetails
          cart={invoice.cart.items}
          address={<p>{invoice.address}</p>}
          payment={<div className={styles.payment}>{invoice.payment}</div>}
        />
      </div>
      <div className={styles.summary}>
        <OrderSummary total={totalPrice} />
      </div>
    </div>
  );
};

export default Invoice;
