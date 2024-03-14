import { Avatar, Box, Button } from '@mui/material';
import { OnlineBadge } from '../../../common/OnlineBadge';
import { randomFaces } from '../../../common/randomFaces';
import MenuWrapper from './Utilities/MenuWrapper';
import FriendsFeatures from '../FriendSection/FriendFeatures/FriendsFeatures';
import { useState } from 'react';

const OnlineFriendsListItems = ({ statusArray }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<ul className="gap-y-2 flex flex-col w-full ">
			{statusArray.map((item, index) => (
				<li key={item._id}>
					<MenuWrapper
						anchorEl={anchorEl}
						handleClose={handleClose}
						open={open}
						transformOrigin={{ horizontal: 'left', vertical: 'top' }}
						anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
					>
						<FriendsFeatures friendsUsername={item.friendId.username} />
					</MenuWrapper>
					<Button
						className="p-2 flex items-center h-full gap-x-2 cursor-pointer w-full rounded bg-white bg-opacity-10 hover:bg-opacity-20"
						style={{
							backdropFilter: 'blur(10px)',
						}}
						onClick={handleClick}
					>
						<OnlineBadge
							overlap="circular"
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							variant="dot"
							className="select-none pointer-events-none"
						>
							<Avatar
								alt={item.friendId.username}
								src={randomFaces()}
								className="select-none pointer-events-none w-8 h-8"
							/>
						</OnlineBadge>
						<p className="capitalize select-none pointer-events-none text-slate-100 text-md">
							{item.friendId.username}
						</p>
					</Button>
				</li>
			))}
		</ul>
	);
};
export default OnlineFriendsListItems;
