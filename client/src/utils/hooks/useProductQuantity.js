import { useSelector } from "react-redux";

export const useProductQuantity = (id) => {
  const items = useSelector((store) => store.cart.items);
  if (items == null) {
    return 0;
  }
  const item = items.filter((item) => item.product._id === id);
  if (item.length > 0) {
    return item[0].quantity;
  } else {
    return 0;
  }
};
