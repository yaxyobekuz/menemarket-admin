import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    updateComments: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateComments } = commentsSlice.actions;

export default commentsSlice.reducer;
