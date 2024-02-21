import { apiSlice } from '../../app/api/apiSlice';

export const playersApiSlice = apiSlice.injectEndpoints({
	tagTypes: ['Status'],
	endpoints: (builder) => ({
		searchPlayers: builder.query({
			query: (args) => {
				const { username, limit } = args;
				return { url: `/api/search?username=${username}&limit=${limit}` };
			},
		}),

		getAllFriendsStatus: builder.query({
			query: ({ username }) => {
				return { url: `/api/friend/status?sender_username=${username}` };
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
				url: `/api/friend/send_request?sender_username=${senderUsername}&receiver_username=${receiverUsername}`,
				method: 'POST',
			}),
			// Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
			// that newly created post could show up in any lists.
			invalidatesTags: (result, error, { _id }) => [{ type: 'Status', _id }],
		}),

		acceptFriendRequest: builder.mutation({
			query: ({ senderUsername, receiverUsername }) => ({
				url: `/api/friend/accept_request?sender_username=${senderUsername}&receiver_username=${receiverUsername}`,
				method: 'PUT',
			}),
			// Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
			// that newly created post could show up in any lists.
			invalidatesTags: (result, error, { _id }) => [{ type: 'Status', _id }],
		}),

		deleteFriend: builder.mutation({
			query: ({ senderUsername, receiverUsername }) => ({
				url: `/api/friend/unfriend?sender_username=${senderUsername}&receiver_username=${receiverUsername}`,
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
