import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: import.meta.env.VITE_REACT_APP_LOGIN_PATH,
				method: 'POST',
				body: { ...credentials },
			}),
		}),

		registerUser: builder.mutation({
			query: (credentials) => ({
				url: import.meta.env.VITE_REACT_APP_REGISTER_PATH,
				method: 'POST',
				body: { ...credentials },
			}),
		}),

		logout: builder.query({
			query: () => import.meta.env.VITE_REACT_APP_LOGOUT_PATH,
			keepUnusedDataFor: 1,
		}),
	}),
});

export const { useLoginMutation, useRegisterUserMutation, useLogoutQuery } = authApiSlice;
