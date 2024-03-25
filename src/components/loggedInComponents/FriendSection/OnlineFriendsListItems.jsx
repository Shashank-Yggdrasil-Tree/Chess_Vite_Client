import { Avatar, Box, Button } from '@mui/material';
import { OnlineBadge } from '../../../common/OnlineBadge';
import { randomFaces } from '../../../common/randomFaces';
import MenuWrapper from './Utilities/MenuWrapper';
import FriendsFeatures from '../FriendSection/FriendFeatures/FriendsFeatures';
import { useContext, useState } from 'react';
import { BreakpointContext } from '../../../BreakpointProvider';
import TooltipWrapper from '../../../common/TooltipWrapper';

const Wrapper = ({ item, handleClick, handleClose, open, anchorEl, offline = false }) => {
	const { lgBreakpoint } = useContext(BreakpointContext);

	const renderFriendCard = () => (
		<Box
			className={`p-2 flex items-center h-full gap-x-2 cursor-pointer w-full rounded bg-white bg-opacity-10 hover:bg-opacity-20 ${offline ? 'mix-blend-luminosity' : null}`}
			style={{ backdropFilter: 'blur(10px)' }}
			onClick={handleClick}
			onMouseEnter={handleClick}
		>
			<OnlineBadge
				overlap="circular"
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				variant="dot"
				className="select-none pointer-events-none"
			>
				<Avatar alt={item.username} src={randomFaces()} className="select-none pointer-events-none w-8 h-8" />
			</OnlineBadge>
			<p className="capitalize select-none pointer-events-none text-slate-100 text-md whitespace-nowrap overflow-hidden overflow-ellipsis">
				{item.username}
			</p>
		</Box>
	);

	return (
		<>
			{!lgBreakpoint ? (
				<li>
					<TooltipWrapper
						isTextOnly={false}
						tooltipContent={<FriendsFeatures friendsUsername={item.username} />}
						placement="right"
						enterDelay={0}
					>
						{renderFriendCard()}
					</TooltipWrapper>
				</li>
			) : (
				<li className="cursor-pointer">
					<MenuWrapper
						anchorEl={anchorEl}
						handleClose={handleClose}
						open={open}
						transformOrigin={{ horizontal: 'left', vertical: 'top' }}
						anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
						className="cursor-pointer"
					>
						<FriendsFeatures friendsUsername={item.username} />
					</MenuWrapper>
					{renderFriendCard()}
				</li>
			)}
		</>
	);
};

const OnlineFriendsListItems = ({ onlineFriends, offlineFriends = null }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	if (offlineFriends) {
		return (
			<ul className="gap-y-2 flex flex-col w-full ">
				{offlineFriends.map((item) => (
					<Wrapper
						key={item}
						item={item}
						handleClick={handleClick}
						handleClose={handleClose}
						open={open}
						anchorEl={anchorEl}
						offline={true}
					/>
				))}
			</ul>
		);
	}

	return (
		<>
			<ul className="gap-y-2 flex flex-col w-full ">
				{onlineFriends.map((item) => (
					<Wrapper
						key={item}
						item={item}
						handleClick={handleClick}
						handleClose={handleClose}
						open={open}
						anchorEl={anchorEl}
					/>
				))}
			</ul>
		</>
	);
};
export default OnlineFriendsListItems;
