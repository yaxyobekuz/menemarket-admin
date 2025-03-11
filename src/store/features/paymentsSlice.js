import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
};

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    updatePayments: (state, action) => {
      state.data = action.payload;
    },

    updatePaymentStatus: (state, action) => {
      const { paymentId, status } = action.payload;
      const payment = state.data.find(({ _id: id }) => id === paymentId);
      if (payment && status) payment.status = status;
    },
  },
});

export const { updatePayments, updatePaymentStatus } = paymentsSlice.actions;

export default paymentsSlice.reducer;
