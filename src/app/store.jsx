import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/gameSlice';
// import loginReducer from '../features/auth/authSlice';
import chatReducer from '../features/chatSlice';

import { setupListeners } from '@reduxjs/toolkit/query';
// import { userApi } from '../features/auth/userApiSlice';

import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';

import friendStatusReducer from '../features/friendStatusSlice';

export const store = configureStore({
	reducer: {
		game: gameReducer,
		// login: loginReducer,
		chat: chatReducer,
		auth: authReducer,
		friendStatus: friendStatusReducer,

		// [userApi.reducerPath]: userApi.reducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
