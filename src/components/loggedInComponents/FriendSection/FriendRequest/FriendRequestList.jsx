import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { useGetAllFriendsStatusQuery } from '../../../../features/players/playersApiSlice';
import { selectCurrentUser } from '../../../../features/auth/authSlice';

import { R_PENDING_STATUS, SENT_PENDING_STATUS } from '../../../../common/Constants';
import '../Utilities/GlobalCssMenu.css';

import FriendRequestListItem from './FriendRequestListItem';
import RefetchButton from './RefetchButton';

const FriendRequestList = () => {
	const [loading, setLoading] = useState(false);
	const username = useSelector(selectCurrentUser);
	const { data: friendsStatusData, isLoading, isSuccess, refetch } = useGetAllFriendsStatusQuery({ username });

	useEffect(() => {
		const loadingTimeout = setTimeout(() => {
			setLoading(false);
		}, 800);

		return () => clearTimeout(loadingTimeout);
	}, [isSuccess, friendsStatusData, loading]);

	const handleRefetch = () => {
		setLoading(true);
		refetch();
	};

	return (
		<>
			<Box className="bg-[#211f1c] h-10 mb-2 p-2 text-[#c3c2c1] text-nowrap flex justify-between items-center">
				<h1>Friend Request Sent</h1>
				<RefetchButton
					tooltipContent="Refresh"
					placement="left"
					classNames="h-full px-4 py-1 w-2 min-w-2 bg-[#32312f] hover:bg-[#454441] bg-opacity-50 hover:bg-opacity-100"
					variants="contained"
					styles={{
						backdropFilter: 'blur(10px)',
					}}
					loading={loading}
					handleOnClick={() => handleRefetch()}
				/>
			</Box>
			<FriendRequestListItem
				status={SENT_PENDING_STATUS}
				altMsg="No outgoing friend request left"
				friendsStatusData={friendsStatusData}
			/>

			<Box className="bg-[#211f1c] h-10 my-2 p-2 text-[#c3c2c1]">Friend Request Received</Box>
			<FriendRequestListItem
				status={R_PENDING_STATUS}
				altMsg="No more friend request"
				friendsStatusData={friendsStatusData}
				isLoading={isLoading}
			/>
		</>
	);
};

export default FriendRequestList;
