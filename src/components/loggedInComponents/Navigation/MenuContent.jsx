import { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import socket from '../../../socket';
import { useDispatch } from 'react-redux';
import { setOrientation, setPlayers, setRoom } from '../../../features/gameSlice';

const MenuContent = ({ isMenuVisible, setIsMenuVisible, collapse, setCollapse }) => {
	const [challenges, setChallenges] = useState([]);
	const [roomError, setRoomError] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		socket.on('challenge', (roomId) => {
			setChallenges((prevChallenges) => [...prevChallenges, roomId]);
		});
	}, []);

	const responsiveClass = {
		lg: 'h-screen bg-black absolute inset-y-0 left-36 z-50 w-72',
		collapsed: 'h-screen bg-black absolute inset-y-0 left-10 z-50 w-72',
	};

	return (
		<>
			{isMenuVisible ? (
				<Box
					className={collapse ? responsiveClass.collapsed : responsiveClass.lg}
					onMouseLeave={() => setIsMenuVisible(false)}
					onMouseEnter={() => setIsMenuVisible(true)}
				>
					{challenges.map((challenge) => (
						<>
							<Stack key={challenge}>{challenge}</Stack>
							<Button
								onClick={() => {
									// Join a room
									socket.emit('joinRoom', { roomId: challenge }, (r) => {
										// r is the response from the server
										if (r.error) return setRoomError(r.message); // if an error is returned in the response set roomError to the error message and exit
										dispatch(setRoom(r?.roomId));
										dispatch(setPlayers(r?.players));
										dispatch(setOrientation('black'));
										// setIsMenuVisible(false)
									});
								}}
							>
								Accept Challenge
							</Button>
						</>
					))}
				</Box>
			) : null}
		</>
	);
};

export default MenuContent;
