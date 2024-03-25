import { useEffect, useState } from 'react';
import { Avatar, Badge, Box, Button, Stack } from '@mui/material';
import socket from '../../../socket';
import { useDispatch, useSelector } from 'react-redux';
import { setOrientation, setPlayers, setRoom } from '../../../features/gameSlice';
import { selectCurrentUser } from '../../../features/auth/authSlice';
import OnlineOfflineStatusIndicator from '../FriendSection/Utilities/OnlineOfflineStatusIndicator';
import { randomFaces } from '../../../common/randomFaces';

const ChallengeList = ({ challenges, setChallenges }) => {
	const user = useSelector(selectCurrentUser);
	const [roomError, setRoomError] = useState('');

	const welcome = user ? `Welcome ${user}` : 'Welcome!';

	//console.log({ challenges });

	const dispatch = useDispatch();

	useEffect(() => {
		socket.on('challenge', ({ roomId, challenger }) => {
			setChallenges((prevChallenges) => {
				const duplicateChallenger = prevChallenges.find((user) => user.challenger === challenger);

				if (!duplicateChallenger) {
					return [...prevChallenges, { roomId, challenger }];
				}

				return prevChallenges;
			});
			//console.log(challenger);
		});
	}, []);

	const heading = (
		<>
			<Box
				className={`p-2 flex justify-center items-center gap-x-2 text-[#c3c2c1] font-bold text-center m-2 drop-shadow-md user-username-component`}
				style={{ backdropFilter: 'blur(10px)' }}
			>
				<Avatar alt="user" src={randomFaces()} className="select-none pointer-events-none w-8 h-8" />
				{welcome}
			</Box>
			<h2 className="font-bold justify-self-center mb-2 p-2 text-lg bg-[#211f1c] p-1 w-full text-[#c3c2c1] rounded">
				Challenges
			</h2>
		</>
	);

	const LayoutWrapper = ({ children }) => {
		return (
			<>
				{heading}
				<Stack className="mb-2 px-2 text-[#c3c2c1] select-none">{children}</Stack>
				<span className="text-white absolute bottom-0 m-2">
					<OnlineOfflineStatusIndicator />
				</span>
			</>
		);
	};

	const renderFriendCard = (challenger) => (
		<Box
			className={`p-2 flex items-center h-full gap-x-2 cursor-pointer w-full rounded bg-white bg-opacity-10 hover:bg-opacity-20`}
			style={{ backdropFilter: 'blur(10px)' }}
		>
			<Avatar alt={challenger} src={randomFaces()} className="select-none pointer-events-none w-8 h-8" />
			<p className="capitalize select-none pointer-events-none text-slate-100 text-md whitespace-nowrap overflow-hidden overflow-ellipsis">
				{challenger}
			</p>
		</Box>
	);

	const content = (
		<>
			{challenges.map(({ roomId, challenger }) => (
				<>
					<Button
						key={roomId}
						onClick={() => {
							// Join a room
							socket.emit('joinRoom', { roomId }, (r) => {
								//console.log(roomId);
								// r is the response from the server
								if (r.error) return setRoomError(r.message); // if an error is returned in the response set roomError to the error message and exit
								dispatch(setRoom(r?.roomId));
								dispatch(setPlayers(r?.players));
								dispatch(setOrientation('black'));
								setChallenges([]);
								// setIsMenuVisible(false)
							});
						}}
						className="justify-between"
					>
						{renderFriendCard(challenger)}
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
