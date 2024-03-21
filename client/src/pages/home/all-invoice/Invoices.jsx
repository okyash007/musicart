import React, { useEffect, useState } from "react";
import { makeGetRequest } from "../../../api/makeGetRequest";
import InvoiceCard from "./invoice-card/InvoiceCard";

const Invoices = () => {
  const [invoices, setInvoices] = useState(null);

  async function getOrders() {
    const data = await makeGetRequest(`http://localhost:5000/api/v1/order`);
    if (data.success === true) {
      console.log(data.data);
      setInvoices(data.data);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  if (invoices == null) {
    return <></>;
  }

  return (
    <div>
      {invoices.map((m) => (
        <InvoiceCard key={m._id} invoice={m} />
      ))}
    </div>
  );
};

export default Invoices;
