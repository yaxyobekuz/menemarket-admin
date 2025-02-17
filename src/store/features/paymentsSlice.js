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
  },
});

export const { updatePayments } = paymentsSlice.actions;

export default paymentsSlice.reducer;
