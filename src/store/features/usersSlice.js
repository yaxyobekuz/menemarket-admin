import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUsers: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateUsers } = usersSlice.actions;

export default usersSlice.reducer;
