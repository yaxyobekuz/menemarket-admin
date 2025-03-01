import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: null,
};

export const workersSlice = createSlice({
  initialState,
  name: "workers",
  reducers: {
    updateWorkers: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateWorkers } = workersSlice.actions;

export default workersSlice.reducer;
