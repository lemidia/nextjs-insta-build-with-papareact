import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalState: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpen: (state) => {
      state.modalState = true;
    },
    modalClose: (state) => {
      state.modalState = false;
    },
  },
});

export const { modalOpen, modalClose } = modalSlice.actions;

export default modalSlice.reducer;
