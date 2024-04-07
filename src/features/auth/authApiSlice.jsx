import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/auth',
				method: 'POST',
				body: { ...credentials },
			}),
		}),

		registerUser: builder.mutation({
			query: (credentials) => ({
				url: '/register',
				method: 'POST',
				body: { ...credentials },
			}),
		}),

		logout: builder.query({
			query: () => '/logout',
			keepUnusedDataFor: 1,
		}),
	}),
});

export const { useLoginMutation, useRegisterUserMutation, useLogoutQuery } = authApiSlice;
