import React from "react";
import styles from "./products.module.css";
import { useSelector } from "react-redux";
import GridCard from "../../../../components/productCards/gridCard/GridCard";
import ModileCard from "../../../../components/productCards/mobileCard/ModileCard";

const Products = () => {
  const products = useSelector((store) => store.product.products);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.bg}>
      <div className={styles.grid}>
        {products.map((m) => (
          <GridCard key={m._id} product={m} />
        ))}
      </div>
      <div className={styles.mobile}>
        {products.map((m) => (
          <ModileCard key={m._id} product={m} />
        ))}
      </div>
    </div>
  );
};

export default Products;
