import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./productDetails.module.css";
import { makeGetRequest } from "../../../api/makeGetRequest";
import AddToCart from "./AddToCart";
import { Carousel } from "react-responsive-carousel";
import CarouselImages from "./CarouselImages";
import { backendUrl } from "../../../utils/constants";

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  async function getProductDetails() {
    const data = await makeGetRequest(
      `${backendUrl}/api/v1/product/${id}`
    );
    setProductDetails(data.data);
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  

  return (
    <div className={styles.bg}>
      <div className={styles.images}>
        <img
          className={styles.selected}
          src={productDetails.images[0]}
          alt=""
        />
        <div className={styles.allimages}>
          {productDetails.images.map((m) => (
            <div key={m} className={styles.image}>
              <img src={m} alt="" />
            </div>
          ))}
          <div className={styles.image}>
            <img src={productDetails.images[0]} alt="" />
          </div>
        </div>
      </div>
      <div className={styles.carousel}>
        <CarouselImages images={productDetails.images} />
      </div>
      <div className={styles.details}>
        <h1>{`${productDetails.brand} ${productDetails.name}`}</h1>
        <h2>{`Price - ₹ ${productDetails.price}`}</h2>
        <p>{`${productDetails.color} | ${productDetails.type}`}</p>
        <div>
          <p>About this item</p>
          {productDetails.about.split("\n").map((m) => (
            <div key={m} className={styles.list}>
              <p>-</p>
              <p>{m}</p>
            </div>
          ))}
          <AddToCart productId={productDetails._id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
