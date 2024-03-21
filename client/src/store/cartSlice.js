import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    id: null,
    items: null,
  },
  reducers: {
    setItems: (state, action) => {
      const { items, id } = action.payload;
      state.items = items;
      state.id = id;
    },
  },
});

export const { setItems } = cartSlice.actions;

export default cartSlice.reducer;
