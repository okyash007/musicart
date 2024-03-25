import React from "react";
import styles from "./mobile-card.module.css";
import { Link } from "react-router-dom";

const ModileCard = ({ product }) => {
  return (
    <Link className={styles.bg} to={`/product/${product._id}`}>
      <div className={styles.image}>
        <img src={product.images[0]} alt="" />
      </div>
      <div className={styles.details}>
        <p>{`${product.brand} ${product.name}`}</p>
        <p>{`Price - ₹ ${product.price}`}</p>
        <p>{`${product.color} | ${product.type}`}</p>
      </div>
    </Link>
  );
};

export default ModileCard;
