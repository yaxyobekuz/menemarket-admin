import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    updateOrders: (state, action) => {
      state.data = action.payload;
    },

    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.data.find(({ _id: id }) => id === orderId);
      if (order && status) order.status = status;
    },
  },
});

export const { updateOrders, updateOrderStatus } = ordersSlice.actions;

export default ordersSlice.reducer;
