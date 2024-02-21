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
	const { data: friendsStatusData, isLoading, isSuccess, isError } = useGetAllFriendsStatusQuery({ username });

	// useEffect(() => {}, [friendsStatusData]);
	const statusArray = friendsStatusData?.length > 0 ? friendsStatusData : [];
	const animationactive = false;

	// mix-blend-luminosity
	const findFriendStatus = statusArray.find((item) => item?.status === 'friends');

	const Layout = ({ children }) => {
		return (
			<Box className="flex justify-start w-full items-start h-full p-2 bg-[#262522] overflow-y-scroll max-h-[42%] no-scrollbar">
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

	const onlyFriends = statusArray.filter((obj) => obj.status === 'friends');

	return (
		<>
			{!isLoading ? (
				<Layout>
					<OnlineFriendsListItems statusArray={onlyFriends} animationactive={animationactive} />
				</Layout>
			) : (
				<SkeletonLoading num={5} ch={20} cw={20} rh={15} rw={100} />
			)}
		</>
	);
};

export default OnlineFriendsList;
