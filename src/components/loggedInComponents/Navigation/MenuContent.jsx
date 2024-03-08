import { Box } from '@mui/material';
import ChallengeList from '../Challenges/ChallengeList';
import { useEffect, useState } from 'react';
import socket from '../../../socket';

const MenuContent = ({ isMenuVisible, setIsMenuVisible, collapse, setCollapse }) => {
	const [challenges, setChallenges] = useState([]);

	useEffect(() => {
		socket.on('challenge', ({ roomId, challenger }) => {
			setChallenges((prevChallenges) => [...prevChallenges, { roomId, challenger }]);
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
					<ChallengeList challenges={challenges} setChallenges={setChallenges} />
				</Box>
			) : null}
		</>
	);
};

export default MenuContent;
