import React, { useContext, useState } from 'react';

import FriendRequestList from './FriendRequest/FriendRequestList';
import MenuWrapper from './Utilities/MenuWrapper';
import OnlineFriendsList from './OnlineFriendsList';
import OnlineFriendsHeading from './OnlineFriendsHeading';

import { BreakpointContext } from '../../../BreakpointProvider';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../features/auth/authSlice';
import { useGetAllFriendsStatusQuery } from '../../../features/players/playersApiSlice';

const FriendSection = () => {
	const { smBreakpoint, lgBreakpointValue } = useContext(BreakpointContext);
	// const [friendsTotalCount, setFriendsTotalCount] = useState;
	// const username = useSelector(selectCurrentUser);
	// const { data: friendsStatusData, isLoading, isSuccess, isError, refetch } = useGetAllFriendsStatusQuery({ username });
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<MenuWrapper anchorEl={anchorEl} handleClose={handleClose} open={open}>
				<FriendRequestList />
			</MenuWrapper>
			<main
				className={`bg-[#21201d] max-h-full h-full rounded-md justify-center ${!lgBreakpointValue ? 'm-4' : 'my-4 mr-3 max-w-20 w-20'}`}
			>
				<OnlineFriendsHeading handleClick={handleClick} />
				<OnlineFriendsList />
				{/* <OnlineFriendsHeading handleClick={handleClick} />
				<OnlineFriendsList /> */}
			</main>
		</>
	);
};

export default FriendSection;
