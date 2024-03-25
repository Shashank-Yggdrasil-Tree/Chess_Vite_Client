import { Badge, Box, IconButton } from '@mui/material';
import React from 'react';
import TooltipWrapper from '../../../common/TooltipWrapper';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector } from 'react-redux';
import { selectCurrentReceivedCount, selectCurrentSentCount } from '../../../features/friendStatusSlice';

const OnlineFriendsHeading = ({ handleClick, offline = false }) => {
	const currentSentCount = useSelector(selectCurrentSentCount);
	const currentReceivedCount = useSelector(selectCurrentReceivedCount);

	const tooltipContent = (
		<>
			Friend Request Sent: {currentSentCount}
			<br />
			Friend Request Received: {currentReceivedCount}
		</>
	);

	return (
		<>
			<Box className="flex items-center justify-between p-2 gap bg-[#21201d] rounded-md w-full">
				<Box className="p-0 m-0 text-white">{offline ? <span>Offline</span> : <span>Online</span>}</Box>
				{!offline ? (
					<TooltipWrapper tooltipContent={tooltipContent} placement="right" className="cursor-help" enterDelay={0}>
						<IconButton
							onClick={handleClick}
							className="text-white min-w-0 m-0 p-0 rounded transform transition-transform duration-200 ease-in-out hover:scale-125 hover:bg-green-800 bg-[#262522] p-1"
						>
							<Badge
								badgeContent={currentSentCount + currentReceivedCount}
								max={999}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
							>
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</TooltipWrapper>
				) : null}
			</Box>
		</>
	);
};

export default OnlineFriendsHeading;
