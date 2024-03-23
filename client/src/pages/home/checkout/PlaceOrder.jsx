import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../../store/cartSlice";
import { makePostRequest } from "../../../api/makePostRequest";
import { useNavigate } from "react-router-dom";

const PlaceOrder = ({ address, payment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((store) => store.cart);

  async function placeOrder() {
    const data = await makePostRequest(`http://localhost:5000/api/v1/order`, {
      cart: cart.id,
      address: address,
      payment: payment,
    });
    if (data.success === true) {
      navigate("/");
      dispatch(setItems({ items: [], id: null }));
    }
  }

  return (
    <button
      onClick={() => {
        placeOrder();
      }}
    >
      PlaceOrder
    </button>
  );
};

export default PlaceOrder;
