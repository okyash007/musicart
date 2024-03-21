import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../../store/cartSlice";
import { makePostRequest } from "../../../api/makePostRequest";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);

  async function placeOrder() {
    const data = await makePostRequest(`http://localhost:5000/api/v1/order`, {
      cart: cart.id,
      address: "b-25, pandav Nagar, meerut",
      payment: "UPI",
    });
    if (data.success === true) {
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
