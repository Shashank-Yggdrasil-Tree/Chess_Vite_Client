import { apiSlice } from '../../app/api/apiSlice';

export const playersApiSlice = apiSlice.injectEndpoints({
	tagTypes: ['Status'],
	endpoints: (builder) => ({
		searchPlayers: builder.query({
			query: (args) => {
				const { username, limit } = args;
				return { url: `${import.meta.env.VITE_REACT_APP_SEARCH_PLAYERS}?username=${username}&limit=${limit}` };
			},
		}),

		getAllFriendsStatus: builder.query({
			query: ({ username }) => {
				return { url: `${import.meta.env.VITE_REACT_APP_FRIEND_STATUS}?sender_username=${username}` };
			},
			// Provides a list of `Posts` by `_id`.
			// If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
			// The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
			providesTags: (result) =>
				// is result available?
				result
					? // successful query
						[...result.map(({ _id }) => ({ type: 'Status', _id })), { type: 'Status', _id: 'LIST' }]
					: // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
						[{ type: 'Status', _id: 'LIST' }],
		}),

		sendFriendRequest: builder.mutation({
			query: ({ senderUsername, receiverUsername }) => ({
				url: `${import.meta.env.VITE_REACT_APP_SEND_REQUEST}?sender_username=${senderUsername}&receiver_username=${receiverUsername}`,
				method: 'POST',
			}),
			// Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
			// that newly created post could show up in any lists.
			invalidatesTags: (result, error, { _id }) => [{ type: 'Status', _id }],
		}),

		acceptFriendRequest: builder.mutation({
			query: ({ senderUsername, receiverUsername }) => ({
				url: `${import.meta.env.VITE_REACT_APP_ACCEPT_REQUEST}?sender_username=${senderUsername}&receiver_username=${receiverUsername}`,
				method: 'PUT',
			}),
			// Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
			// that newly created post could show up in any lists.
			invalidatesTags: (result, error, { _id }) => [{ type: 'Status', _id }],
		}),

		deleteFriend: builder.mutation({
			query: ({ senderUsername, receiverUsername }) => ({
				url: `${import.meta.env.VITE_REACT_APP_DELETE_FRIEND}?sender_username=${senderUsername}&receiver_username=${receiverUsername}`,
				method: 'DELETE',
			}),
			// Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
			// that newly created post could show up in any lists.
			invalidatesTags: (result, error, _id) => [{ type: 'Status', _id }],
		}),
	}),
});
export const {
	useSearchPlayersQuery,
	useGetAllFriendsStatusQuery,
	useSendFriendRequestMutation,
	useAcceptFriendRequestMutation,
	useDeleteFriendMutation,
} = playersApiSlice;
