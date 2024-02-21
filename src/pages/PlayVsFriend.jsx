import React from 'react';
import ResponsiveChessBoard from '../components/ResponsiveChessBoard';
import { selectCurrentToken, selectCurrentUser } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Box, Stack } from '@mui/material';
import Game from '../Game';

const PlayVsFriend = () => {
	const user = useSelector(selectCurrentUser);
	const token = useSelector(selectCurrentToken);
	const room = useSelector((state) => state.game.room);

	const welcome = user ? `Welcome ${user}` : 'Welcome!';
	const tokenAbbr = `${token.slice(0, 9)}...`;

	const content = (
		<Stack className="grow">
			{/* <h1 className="text-white">{welcome}</h1>
			<p className="text-white">Token: {tokenAbbr}</p> */}
			<Box className="grow">
				{room ? <Game /> : <ResponsiveChessBoard styled customClassName="max-w-[40rem] max-h-lg grow ml-12" />}
			</Box>
		</Stack>
	);

	return content;
};

export default PlayVsFriend;
