import { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import socket from '../../../socket';
import { useDispatch, useSelector } from 'react-redux';
import { setOrientation, setPlayers, setRoom } from '../../../features/gameSlice';
import { selectCurrentUser } from '../../../features/auth/authSlice';

const ChallengeList = ({ challenges, setChallenges }) => {
	const [roomError, setRoomError] = useState('');
	const [challenger, setChallenger] = useState('');

	console.log({ challenges });

	const dispatch = useDispatch();

	useEffect(() => {
		socket.on('challenge', ({ roomId, challenger }) => {
			setChallenges((prevChallenges) => [...prevChallenges, { roomId, challenger }]);
			console.log(challenger);
		});
	}, []);

	const heading = (
		<h2 className="font-bold justify-self-center mb-2 text-lg bg-[#211f1c] p-1 w-full text-[#c3c2c1] rounded">
			Challenges
		</h2>
	);

	const LayoutWrapper = ({ children }) => {
		return (
			<>
				{heading}
				<Stack className="mb-2 px-2 text-[#c3c2c1] select-none">{children}</Stack>
			</>
		);
	};

	const content = (
		<>
			{challenges.map(({ roomId, challenger }) => (
				<>
					<Button
						key={roomId}
						onClick={() => {
							// Join a room
							socket.emit('joinRoom', { roomId }, (r) => {
								console.log(roomId);
								// r is the response from the server
								if (r.error) return setRoomError(r.message); // if an error is returned in the response set roomError to the error message and exit
								dispatch(setRoom(r?.roomId));
								dispatch(setPlayers(r?.players));
								dispatch(setOrientation('black'));
								setChallenges([]);
								// setIsMenuVisible(false)
							});
						}}
					>
						<p className="user-username-component capitalize">{challenger}</p>
						<img className="w-4" src="/svg_icons/accept.svg" alt="accept_challenge" />
					</Button>
				</>
			))}
		</>
	);

	if (!challenges.length) {
		return (
			<LayoutWrapper>
				<p className="font-sm lowercase">No Current Challenges.</p>
			</LayoutWrapper>
		);
	}

	return <LayoutWrapper>{content}</LayoutWrapper>;
};

export default ChallengeList;
