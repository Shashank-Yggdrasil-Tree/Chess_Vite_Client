import React, { useEffect, useState } from 'react';
import ResponsiveChessBoard from '../components/ResponsiveChessBoard';
import { selectCurrentToken, selectCurrentUser } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Box, Button, Stack } from '@mui/material';
import Game from '../Game';
import useWindowDimensions from '../hooks/useWindowDimension';
import FriendSection from '../components/loggedInComponents/FriendSection/FriendSection';
import Menu from '../components/loggedInComponents/Menu/Menu';

const PlayVsFriend = () => {
	const user = useSelector(selectCurrentUser);
	const room = useSelector((state) => state.game.room);

	const responsiveClass = {
		chessBoard:
			'w-[100%] pb-18 md:pb-0 md:m-0 sm:w-[80%] md:w-[80%] lg:w-[80%] xl:w-[38rem] 2xl:w-[38rem] max-w-[38rem] h-screen md:max-h-lg md:h-full grow flex justify-center items-center',
	};

	const content = (
		<Stack className="grow h-full w-full">
			{/* <Box className="grow h-full w-full">
				<Game responsiveClass={responsiveClass.chessBoard} />
			</Box> */}

			{/* <p className="text-white">Token: {tokenAbbr}</p> */}
			{room ? (
				<Game responsiveClass={responsiveClass.chessBoard} />
			) : (
				<Stack className="grow h-full w-full flex justify-center items-center">
					<ResponsiveChessBoard customClassName={responsiveClass.chessBoard} />
				</Stack>
			)}
		</Stack>
	);

	return content;
};

export default PlayVsFriend;
