import React from "react";
import styles from "./products.module.css";
import { useSelector } from "react-redux";
import GridCard from "../../../../components/productCards/gridCard/GridCard";

const Products = () => {
  const products = useSelector((store) => store.product.products);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.bg}>
      {products.map((m) => (
        <GridCard key={m._id} product={m} />
      ))}
    </div>
  );
};

export default Products;
