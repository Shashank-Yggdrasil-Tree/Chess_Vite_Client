import { createSlice } from '@reduxjs/toolkit';
import { playersApiSlice } from './players/playersApiSlice';

const initialState = {
	friends: [],
	sentRequests: [],
	receivedRequests: [],
	sentCount: 0,
	receivedCount: 0,
};

export const friendStatusSlice = createSlice({
	name: 'friendStatus',
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder.addMatcher(playersApiSlice.endpoints.getAllFriendsStatus.matchFulfilled, (state, { payload }) => ({
			...state,
			friends: payload.filter((player) => player.status === 'friends') || [],
			sentRequests: payload.filter((player) => player.status === 'sent_pending') || [],
			receivedRequests: payload.filter((player) => player.status === 'received_pending') || [],
			sentCount: payload.reduce((a, c) => (c.status === 'sent_pending' ? (a += 1) : a), 0),
			receivedCount: payload.reduce((a, c) => (c.status === 'received_pending' ? (a += 1) : a), 0),
		}));
	},
});

// Action creators are generated for each case reducer function
// export const {  } = friendStatus.actions;

export default friendStatusSlice.reducer;

export const selectCurrentFriends = (state) => state.friendStatus.friends;
export const selectCurrentSentRequests = (state) => state.friendStatus.sentRequests;
export const selectCurrentReceivedRequests = (state) => state.friendStatus.receivedRequests;
export const selectCurrentSentCount = (state) => state.friendStatus.sentCount;
export const selectCurrentReceivedCount = (state) => state.friendStatus.receivedCount;
