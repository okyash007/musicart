import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: null,
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = cartSlice.actions;

export default cartSlice.reducer;
