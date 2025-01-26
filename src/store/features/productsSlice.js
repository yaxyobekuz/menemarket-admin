import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateProducts } = productsSlice.actions;

export default productsSlice.reducer;
