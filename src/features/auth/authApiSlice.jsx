import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
	// tagTypes: ['user'],
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/auth',
				method: 'POST',
				body: { ...credentials },
			}),
			// providesTags: ['user'],
		}),

		registerUser: builder.mutation({
			query: (credentials) => ({
				url: '/register',
				method: 'POST',
				body: { ...credentials },
			}),
			// providesTags: ['user'],
		}),

		// refreshToken: builder.query({
		// 	query: () => '/refresh',
		// 	providesTags: ['user'],
		// 	keepUnusedDataFor: 1,
		// }),

		logout: builder.query({
			query: () => '/logout',
			providesTags: ['user'],
			keepUnusedDataFor: 1,
		}),
	}),
});

export const { useLoginMutation, useRegisterUserMutation, useLogoutQuery } = authApiSlice;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { BASE_URL } from '../../constants/constants'

// export const userApi = createApi({
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: BASE_URL,
// 		prepareHeaders: (headers, { getState }) => {
// 			const token = getState().auth.accesstoken;
// 			if (token) {
// 				headers.set('authorization', `bearer ${token}`);
// 			}

// 			headers.set('credentials', 'include');

// 			return headers;
// 		},
// 	}),
// 	tagTypes: ['user'],
// 	endpoints: (build) => ({
// 		getUsers: build.query({
// 			query: () => '/users',
// 			transformResponse: (res) => res.sort((a, b) => b.id - a.id),
// 			providesTags: ['user'],
// 		}),
// 		register: build.mutation({
// 			query: (data) => ({
// 				url: 'register',
// 				method: 'POST',
// 				body: data,
// 			}),
// 			invalidatesTags: ['user'],
// 		}),
// 		login: build.mutation({
// 			query: (data) => ({
// 				url: 'login',
// 				method: 'POST',
// 				body: data,
// 			}),
// 			invalidatesTags: ['user'],
// 		}),
// 	}),
// });

// export const { useGetUsersQuery, useRegisterMutation, useLoginMutation } = userApi;
