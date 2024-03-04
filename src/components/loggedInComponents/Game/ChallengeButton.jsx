import React from 'react';
import TooltipWrapper from '../../../common/TooltipWrapper';
import socket from '../../../socket';
import { useDispatch, useSelector } from 'react-redux';
import { setOrientation, setRoom } from '../../../features/gameSlice';
import { selectCurrentUser } from '../../../features/auth/authSlice';
import { Button } from '@mui/material';

const ChallengeButton = ({ challengee, bgColourAndOpacity = 'bg-red-500 bg-opacity-10 hover:bg-opacity-40' }) => {
	const dispatch = useDispatch();
	const challenger = useSelector(selectCurrentUser);

	return (
		<TooltipWrapper tooltipContent="Sent Challenge" placement="top">
			<Button
				className={`m-w-2 p-2 w-4 min-w-10 ${bgColourAndOpacity}`}
				variant="contained"
				style={{
					backdropFilter: 'blur(10px)',
				}}
				onClick={() =>
					socket.emit('createRoom', { challenger, challengee }, (r) => {
						if (r.error) return;
						console.log(r.m);
						dispatch(setRoom(r));
						dispatch(setOrientation('white'));
					})
				}
			>
				<img src="/svg_icons/battle.svg" alt="challenge" className="w-6" />
			</Button>
		</TooltipWrapper>
	);
};

export default ChallengeButton;
