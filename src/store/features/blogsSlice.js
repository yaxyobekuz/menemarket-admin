import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    updateBlogs: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateBlogs } = blogsSlice.actions;

export default blogsSlice.reducer;
