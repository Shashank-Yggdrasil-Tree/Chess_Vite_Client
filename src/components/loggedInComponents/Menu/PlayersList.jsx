import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useSendFriendRequestMutation } from '../../../features/players/playersApiSlice';
import { selectCurrentUser } from '../../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TOAST_CONFIG } from '../../../constants/toast-config';
import SkeletonLoading from '../../../common/SkeletonLoading';
import ChallengeButton from '../Game/ChallengeButton';
import SendFrndReqButton from '../FriendSection/FriendFeatures/SendFrndReqButton';
import { randomFaces } from '../../../common/randomFaces';

const PlayersList = React.memo(({ players, isSearchResultFetching, isSearchResultSuccess, query }) => {
	const senderUsername = useSelector(selectCurrentUser);

	const [
		sendFriendRequest,
		{ data: sendFriendRequestData, isSuccess: isSendFriendRequestSuccess, isLoading: isSendFriendRequestLoading },
	] = useSendFriendRequestMutation();

	const filteredPlayers = useMemo(() => {
		//console.log('players:', players);
		return players.filter((item) => {
			return item.toLowerCase().includes(query.toLowerCase());
		});
	}, [players, query]);

	useEffect(() => {
		if (isSendFriendRequestSuccess) {
			toast.success(sendFriendRequestData.message, TOAST_CONFIG);
			// console.log('sendFriendRequestData.message: ', sendFriendRequestData.message);
		}
	}, [isSendFriendRequestSuccess]);

	const handleSendFriendRequestClick = async (receiverUsername) => {
		try {
			if (receiverUsername) {
				await sendFriendRequest({
					senderUsername,
					receiverUsername,
				}).unwrap();
			}
		} catch (error) {
			toast.error(error, TOAST_CONFIG);
		}
	};

	return (
		<>
			{isSearchResultSuccess ? (
				<ul className="max-h-24">
					{filteredPlayers.map((username) => (
						<Box
							key={username}
							className="flex justify-between mb-2 mx-2 p-2 rounded bg-[#383734] bg-opacity-50 hover:bg-opacity-70"
							style={{
								backdropFilter: 'blur(10px)',
							}}
						>
							<li className="flex items-center pointer-events-none select-none">
								<img src={randomFaces()} alt="face_icon" className="w-8 h-8 mr-2 pointer-events-none select-none"></img>
								<p className="font-medium pointer-events-none select-none text-ellipsis capitalize">{username}</p>
							</li>
							<Box className="flex gap-2">
								<ChallengeButton challengee={username} />
								<SendFrndReqButton handleSendFriendRequestClick={handleSendFriendRequestClick} username={username} />
							</Box>
						</Box>
					))}
				</ul>
			) : isSendFriendRequestLoading ? (
				<SkeletonLoading rw={300} cw={40} />
			) : null}
		</>
	);
});

export default PlayersList;
