import { Button } from '@mui/material';
import { R_PENDING_STATUS } from '../../../../common/Constants';
import TooltipWrapper from '../../../../common/TooltipWrapper';
import { useEffect, useState } from 'react';
import { useAcceptFriendRequestMutation } from '../../../../features/players/playersApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../../../../constants/toast-config';

const AcceptButton = ({ status, friendsUsername }) => {
	const senderUsername = useSelector(selectCurrentUser);
	const [acceptFriendRequest, { data, isLoading, isSuccess }] = useAcceptFriendRequestMutation();

	useEffect(() => {
		if (isSuccess) {
			toast.success(data.message, TOAST_CONFIG);
		}
	}, [isSuccess]);

	return (
		<>
			{status === R_PENDING_STATUS ? (
				<TooltipWrapper tooltipContent="Accept" placement="top">
					<Button
						className="p-2 w-4 min-w-10 bg-[#32312f] hover:bg-[#454441] bg-opacity-50 hover:bg-opacity-100"
						variant="contained"
						style={{
							backdropFilter: 'blur(10px)',
						}}
						onClick={() =>
							acceptFriendRequest({
								senderUsername,
								receiverUsername: friendsUsername,
							})
						}
					>
						<img src="/svg_icons/tick.svg" alt="accept" className="w-5" />
					</Button>
				</TooltipWrapper>
			) : (
				<Button className="p-2 w-4 min-w-10" disabled></Button>
			)}
		</>
	);
};

export default AcceptButton;
