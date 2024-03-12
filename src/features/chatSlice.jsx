import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	message: [],
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		addMessage: (state, action) => {
			state.message = [...state.message, action.payload];
		},
		setMessages: (state, action) => {
			state.message = [...action.payload];
		},
	},
});

export const { addMessage, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
