import React from 'react';
import ResponsiveChessBoard from '../components/ResponsiveChessBoard';
import { selectCurrentToken, selectCurrentUser } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Box, Stack } from '@mui/material';
import Game from '../Game';

const PlayVsFriend = () => {
	const user = useSelector(selectCurrentUser);
	const room = useSelector((state) => state.game.room);

	const welcome = user ? `Welcome ${user}` : 'Welcome!';

	const responsiveClass = {
		chessBoard: 'w-[20rem] lg:w-[38rem] max-h-lg grow h-full flex justify-center items-center',
	};

	const content = (
		<Stack className="grow h-full w-full">
			{/* <h1 className="text-white">{welcome}</h1>
			<p className="text-white">Token: {tokenAbbr}</p> */}
			{room ? (
				<Box className="grow h-full w-full">
					<Game responsiveClass={responsiveClass.chessBoard} />
				</Box>
			) : (
				<Box className="grow h-full w-full">
					<Game responsiveClass={responsiveClass.chessBoard} />
					{/* <ResponsiveChessBoard styled customClassName={responsiveClass.chessBoard} /> */}
				</Box>
			)}
		</Stack>
	);

	return content;
};

export default PlayVsFriend;
