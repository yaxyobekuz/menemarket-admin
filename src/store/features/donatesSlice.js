import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
};

export const donatesSlice = createSlice({
  name: "donates",
  initialState,
  reducers: {
    updateDonates: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateDonates } = donatesSlice.actions;

export default donatesSlice.reducer;
