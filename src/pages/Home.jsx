import React, { useContext } from 'react';
import Game from '../Game';
import { useSelector } from 'react-redux';
import ResponsiveChessBoard from '../components/ResponsiveChessBoard';
import { selectCurrentToken } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { BreakpointContext } from '../BreakpointProvider';

const Home = () => {
	const room = useSelector((state) => state.game.room);
	const token = useSelector(selectCurrentToken);
	const { lgBreakpoint, smBreakpoint, mdBreakpoint } = useContext(BreakpointContext);

	return (
		<>
			{token ? (
				<Navigate to="/play-vs-friend" replace={true} />
			) : room ? (
				<Game />
			) : (
				<Box className="grow h-full w-full flex justify-center items-center">
					<ResponsiveChessBoard
						customClassName={`max-w-lg max-h-lg grow ${mdBreakpoint ? 'min-w-[20%]' : 'min-w-[30em]'}`}
					/>
				</Box>
			)}
		</>
	);
};

export default Home;
