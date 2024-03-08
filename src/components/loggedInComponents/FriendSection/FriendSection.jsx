import React, { useContext, useState } from 'react';

import FriendRequestList from './FriendRequest/FriendRequestList';
import MenuWrapper from './Utilities/MenuWrapper';
import OnlineFriendsList from './OnlineFriendsList';
import OnlineFriendsHeading from './OnlineFriendsHeading';

import { BreakpointContext } from '../../../BreakpointProvider';

const FriendSection = () => {
	const { smBreakpoint } = useContext(BreakpointContext);
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
				className={`bg-[#21201d] max-h-[44em] overflow-hidden h-full rounded-md justify-center ${smBreakpoint ? 'm-4' : 'my-4 mr-3'}`}
			>
				<OnlineFriendsHeading handleClick={handleClick} />
				<OnlineFriendsList />
				<OnlineFriendsHeading handleClick={handleClick} />
				<OnlineFriendsList />
			</main>
		</>
	);
};

export default FriendSection;
