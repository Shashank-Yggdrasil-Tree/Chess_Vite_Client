import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';
import { BASE_URL } from '../../constants/constants';

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

// Simulating axios-like interceptors with a custom base query;
const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	console.log(result);

	if (result?.error?.originalStatus === 401) {
		// api.dispatch(logOut());
		console.log(result?.error?.originalStatus);
	}

	if (result?.error?.originalStatus === 403) {
		console.log('sending refresh token');
		// send refresh token to get new access token
		const refreshResult = await baseQuery('/refresh', api, extraOptions);
		console.log(refreshResult);
		if (refreshResult?.data) {
			const user = api.getState().auth.user;
			// store the new token
			api.dispatch(setCredentials({ ...refreshResult.data, user }));
			// retry the original query with new access token
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logOut());
		}
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({}),
});
