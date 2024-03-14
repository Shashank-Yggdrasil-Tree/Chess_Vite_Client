import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../features/auth/authSlice';
import { useGetAllFriendsStatusQuery } from '../../../features/players/playersApiSlice';

// import { statusArray } from './Utilities/data';
import OnlineFriendsListItems from './OnlineFriendsListItems';
import SkeletonLoading from '../../../common/SkeletonLoading';

const OnlineFriendsList = () => {
	const username = useSelector(selectCurrentUser);
	const { data: friendsStatusData, isLoading } = useGetAllFriendsStatusQuery({ username });

	// useEffect(() => {}, [friendsStatusData]);
	const statusArray = friendsStatusData?.length > 0 ? friendsStatusData : [];

	// mix-blend-luminosity
	const findFriendStatus = statusArray.find((item) => item?.status === 'friends');

	console.log(findFriendStatus);

	const Layout = ({ children }) => {
		return (
			<Box className="flex justify-start w-full items-start h-full p-2 bg-[#262522] overflow-y-auto max-h-[42%] no-scrollbar">
				{children}
			</Box>
		);
	};

	if (!findFriendStatus) {
		return (
			<Layout>
				<p className="text-white">No Friends are online.</p>
			</Layout>
		);
	}

	const Friends = statusArray.filter((obj) => obj.status === 'friends');

	return (
		<>
			{!isLoading ? (
				<Layout>
					<OnlineFriendsListItems statusArray={Friends} />
				</Layout>
			) : (
				<SkeletonLoading num={5} ch={20} cw={20} rh={15} rw={100} />
			)}
		</>
	);
};

export default OnlineFriendsList;
