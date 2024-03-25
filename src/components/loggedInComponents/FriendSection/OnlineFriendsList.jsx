import { Box } from '@mui/material';
import { useContext, useState } from 'react';

// import { statusArray } from './Utilities/data';
import OnlineFriendsListItems from './OnlineFriendsListItems';
import OnlineFriendsHeading from './OnlineFriendsHeading';
import { BreakpointContext } from '../../../BreakpointProvider';
import MenuWrapper from './Utilities/MenuWrapper';
import FriendRequestList from './FriendRequest/FriendRequestList';
import { Layout } from './Layout';

const OnlineFriendsList = ({ onlineFriends, offlineFriends }) => {
	if (!onlineFriends.length) {
		return (
			<Layout onlineFriends={onlineFriends} offlineFriends={offlineFriends}>
				<p className="text-[#939291] text-xs">Your friends will appear here when you add them.</p>
			</Layout>
		);
	}

	return (
		<>
			<Layout onlineFriends={onlineFriends} offlineFriends={offlineFriends}>
				<OnlineFriendsListItems onlineFriends={onlineFriends} />
			</Layout>
		</>
	);
};

export default OnlineFriendsList;
