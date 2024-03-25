import { Box } from '@mui/material';
import { useContext, useState } from 'react';

import OnlineFriendsListItems from './OnlineFriendsListItems';
import OnlineFriendsHeading from './OnlineFriendsHeading';
import { BreakpointContext } from '../../../BreakpointProvider';
import MenuWrapper from './Utilities/MenuWrapper';
import FriendRequestList from './FriendRequest/FriendRequestList';

export const Layout = ({ children, onlineFriends, offlineFriends }) => {
	const { lgBreakpoint, xlBreakpoint, xxlBreakpoint, mdBreakpoint, smBreakpoint } = useContext(BreakpointContext);
	const lgScreen = (lgBreakpoint || xlBreakpoint || xxlBreakpoint) && !mdBreakpoint && !smBreakpoint;

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
				className={`bg-[#21201d] min-w-[10em] max-h-full h-full rounded-md justify-center ${lgScreen ? 'my-4 ml-3 mr-2 max-w-[10em] w-20' : 'm-4'}`}
			>
				<OnlineFriendsHeading handleClick={handleClick} />
				<Box className="flex justify-start w-full items-start h-full p-2 bg-[#262522] overflow-y-auto max-h-[42%] no-scrollbar">
					{children}
				</Box>
				<OnlineFriendsHeading handleClick={handleClick} offline={true} />
				<Box className="flex justify-start w-full items-start h-full p-2 bg-[#262522] overflow-y-auto max-h-[42%] no-scrollbar">
					<OnlineFriendsListItems onlineFriends={onlineFriends} offlineFriends={offlineFriends} />
				</Box>
			</main>
		</>
	);
};
