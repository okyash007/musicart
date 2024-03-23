import React, { useState } from "react";
import { useProductQuantity } from "../../../utils/hooks/useProductQuantity";
import { makePostRequest } from "../../../api/makePostRequest";
import { setItems } from "../../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./productDetails.module.css";
import Loader from "../../../components/loader/Loader";

const AddToCart = ({ productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.data);
  const quantityInCart = useProductQuantity(productId);
  const [loading, setLoading] = useState({
    addToCart: false,
    buyNow: false,
  });

  function changeLoading(key, value) {
    setLoading((prev) => ({ ...prev, [key]: value }));
  }

  async function addToCart() {
    const data = await makePostRequest(
      `http://localhost:5000/api/v1/cart/add`,
      {
        productId,
        quantity: quantityInCart + 1,
      }
    );
    console.log(data);
    changeLoading("addToCart", false);
    if (data.success === true) {
      dispatch(setItems({ items: data.data.items, id: data.data._id }));
    }
  }

  return (
    <div className={styles.buttons}>
      {loading.addToCart ? (
        <button className="button1" style={{ background: "#FFD600" }}>
          <Loader color={"black"} size={"1rem"} />
        </button>
      ) : (
        <button
          className="button1"
          style={{ background: "#FFD600" }}
          onClick={() => {
            if (user) {
              if (quantityInCart !== 8) {
                changeLoading("addToCart", true);
                addToCart();
              }
            } else {
              navigate("/login");
            }
          }}
        >
          Add To Cart
        </button>
      )}
      {loading.buyNow ? (
        <button className="button1" style={{ background: "#FFB800" }}>
          <Loader color={"black"} size={"1rem"} />
        </button>
      ) : (
        <button className="button1" style={{ backgroundColor: "#FFB800" }}>
          Buy Now
        </button>
      )}
    </div>
  );
};

export default AddToCart;
