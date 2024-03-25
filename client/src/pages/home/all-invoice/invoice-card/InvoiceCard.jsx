import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import styles from "./invoicecard.module.css";
import { Link } from "react-router-dom";

const InvoiceCard = ({ invoice }) => {
  return (
    <div className={styles.bg}>
      <div className={styles.right}>
        <FaFileInvoiceDollar size={60} color="#0000007a" />
        <div>
          <p>{invoice.user.name}</p>
          <p>{invoice.address}</p>
        </div>
      </div>
      <Link to={`/invoice/${invoice._id}`}>
        <button className={styles.button + " " + "button1"}>
          View Invoice
        </button>
      </Link>
    </div>
  );
};

export default InvoiceCard;
