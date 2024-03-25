import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../../store/cartSlice";
import { makePostRequest } from "../../../api/makePostRequest";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import styles from "./checkout.module.css";
import { backendUrl } from "../../../utils/constants";

const PlaceOrder = ({ address, payment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((store) => store.cart);
  const [loading, setLoading] = useState(false);

  async function placeOrder() {
    const data = await makePostRequest(`${backendUrl}/api/v1/order`, {
      cart: cart.id,
      address: address,
      payment: payment,
    });
    if (data.success === true) {
      setLoading(false);
      navigate("/");
      dispatch(setItems({ items: [], id: null }));
    }
  }

  return (
    <>
      {loading ? (
        <button className={"button1" + " " + styles.place}>
          <Loader size={"1rem"} color={"#000000"} />
        </button>
      ) : (
        <button
          className={"button1" + " " + styles.place}
          onClick={() => {
            setLoading(true);
            placeOrder();
          }}
        >
          Place Order
        </button>
      )}
    </>
  );
};

export default PlaceOrder;
