import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    updateBlogs: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateBlogs } = blogSlice.actions;

export default blogSlice.reducer;
