import React from 'react';
import TooltipWrapper from '../../../../common/TooltipWrapper';
import { Button } from '@mui/material';

const SendFrndReqButton = ({ handleSendFriendRequestClick, username }) => {
	return (
		<TooltipWrapper tooltipContent="Send Friend Request" placement="top">
			<Button
				className="m-w-2 p-2 w-4 min-w-10 bg-green-500 bg-opacity-20 hover:bg-opacity-40"
				variant="contained"
				style={{
					backdropFilter: 'blur(10px)',
				}}
				onClick={() => handleSendFriendRequestClick(username)}
			>
				<img src="/svg_icons/hand_shake.svg" alt="add_friend" className="w-6" />
			</Button>
		</TooltipWrapper>
	);
};

export default SendFrndReqButton;
