import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
};

export const streamsSlice = createSlice({
  name: "streams",
  initialState,
  reducers: {
    updateStreams: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateStreams } = streamsSlice.actions;

export default streamsSlice.reducer;
