import React from "react";
import { useProductQuantity } from "../../../utils/hooks/useProductQuantity";
import { makePostRequest } from "../../../api/makePostRequest";
import { setItems } from "../../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddToCart = ({ productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.data);
  const quantityInCart = useProductQuantity(productId);

  console.log(quantityInCart);

  async function addToCart() {
    const data = await makePostRequest(
      `http://localhost:5000/api/v1/cart/add`,
      {
        productId,
        quantity: quantityInCart + 1,
      }
    );
    console.log(data);
    if (data.success === true) {
      dispatch(setItems({ items: data.data.items, id: data.data._id }));
    }
  }

  return (
    <button
      onClick={() => {
        if (user) {
          addToCart();
        } else {
          navigate("/login");
        }
      }}
    >
      AddToCart
    </button>
  );
};

export default AddToCart;
