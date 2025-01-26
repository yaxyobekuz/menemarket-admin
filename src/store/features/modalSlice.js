import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: null,
  isOpen: false,
  name: "Modal name",
  title: "Modal title",
  buttons: {
    primary: {
      label: "Submit",
      action: false,
    },
    secondary: {
      label: "Cancel",
      action: false,
    },
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updateModal: (state, action) => {
      Object.assign(state, action.payload);
    },

    resetModal: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateModal, resetModal } = modalSlice.actions;

export default modalSlice.reducer;
