import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
    card: "grid",
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCard: (state, action) => {
      state.card = action.payload;
    },
  },
});

export const { setProducts, setCard } = productSlice.actions;

export default productSlice.reducer;
