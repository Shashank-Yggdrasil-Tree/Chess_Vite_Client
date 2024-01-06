import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: [
    {
      id: 0,
      username: "",
      text: "",
      // timestamp: 0,
      // status: "",
    },
  ],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.message = [...state.message, action.payload];
    },
    // updateMessage: (state, action) => {
    //   state.message
    // }
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
