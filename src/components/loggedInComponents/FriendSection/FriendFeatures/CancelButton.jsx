import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TooltipWrapper from '../../../../common/TooltipWrapper';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../features/auth/authSlice';
import { useDeleteFriendMutation } from '../../../../features/players/playersApiSlice';
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../../../../constants/toast-config';

const CancelButton = ({ helperText = 'delete', bgColor = 'bg-[#32312f]', friendsUsername }) => {
	const senderUsername = useSelector(selectCurrentUser);
	const [unfriendRequest, { data, isLoading, isSuccess }] = useDeleteFriendMutation();

	useEffect(() => {
		if (isSuccess) {
			toast.success(data.message, TOAST_CONFIG);
		}
	}, [isSuccess]);

	return (
		<>
			<TooltipWrapper tooltipContent={helperText} placement="top">
				<Button
					className={`backdrop-blur-md m-w-2 p-2 w-4 min-w-10 ${bgColor} hover:bg-red-500 bg-opacity-50 hover:bg-opacity-100`}
					variant="contained"
					onClick={() => {
						unfriendRequest({
							senderUsername,
							receiverUsername: friendsUsername,
						});
					}}
				>
					<img src="/svg_icons/cross.svg" alt="cancel" className="min-w-6" />
				</Button>
			</TooltipWrapper>
		</>
	);
};

export default CancelButton;
