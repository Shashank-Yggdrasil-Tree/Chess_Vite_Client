import { Box, IconButton } from '@mui/material';
import React from 'react';
import TooltipWrapper from '../../../common/TooltipWrapper';
import NotificationsIcon from '@mui/icons-material/Notifications';

const OnlineFriendsHeading = ({ handleClick }) => {
	return (
		<>
			<Box className="flex items-center justify-between p-2 gap bg-[#21201d] rounded-md w-full">
				<Box className="p-0 m-0 text-white">Online</Box>
				<TooltipWrapper tooltipContent="Notification" placement="right" className="cursor-help">
					<IconButton
						onClick={handleClick}
						className="text-white min-w-0 m-0 p-0 rounded transform transition-transform duration-200 ease-in-out hover:scale-125 hover:bg-green-800 bg-[#262522] p-1"
					>
						<NotificationsIcon />
					</IconButton>
				</TooltipWrapper>
			</Box>
		</>
	);
};

export default OnlineFriendsHeading;
