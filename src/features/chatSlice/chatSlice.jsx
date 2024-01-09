import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: [
    {
      id: 0,
      username: '',
      text: '',
      // timestamp: 0,
      // status: "",
    },
  ],
  input: '',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.message = [...state.message, action.payload];
    },
    setInput: (state, action) => {
      state.input = action.payload;
    },
  },
});

export const { addMessage, setInput } = chatSlice.actions;

export default chatSlice.reducer;
