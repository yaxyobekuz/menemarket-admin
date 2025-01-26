import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    updateNews: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateNews } = newsSlice.actions;

export default newsSlice.reducer;
