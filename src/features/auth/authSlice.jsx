import { createSlice } from '@reduxjs/toolkit';
import { authApiSlice } from './authApiSlice';

// we can remove auth later.

const initialState = {
	user: '',
	token: null,
	auth: {},
	persist: JSON.parse(localStorage.getItem('persist')) || false,
	refreshToken: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { user, accessToken } = action.payload;
			state.user = user;
			state.token = accessToken;
		},

		logOut: (state, action) => {
			state.user = null;
			state.token = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(authApiSlice.endpoints.registerUser.matchFulfilled, (state, { payload }) => ({
				...state,
				auth: payload,
				persist: payload.userCreated,
			}))
			.addMatcher(authApiSlice.endpoints.login.matchFulfilled, (state, { payload }) => ({
				...state,
				auth: payload,
				persist: true,
			}))
			.addMatcher(authApiSlice.endpoints.logout.matchFulfilled, (state) => ({
				...state,
				user: null,
				token: null,
				auth: {},
				persist: false,
				refreshToken: null,
			}));
		// .addMatcher(authApiSlice.endpoints.refreshToken.matchFulfilled, (state, { payload }) => ({
		// 	...state,
		// 	auth: payload,
		// 	token: payload.accessToken,
		// 	user: payload.user,
		// 	persist: true,
		// }))
	},
});

// Action creators are generated for each case reducer function
export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentAuth = (state) => state.auth.auth;
export const selectCurrentPersist = (state) => state.auth.persist;
