import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Paper, Stack } from '@mui/material';

import classNames from 'classnames';
import TooltipWrapper from '../../common/TooltipWrapper';

import { addMessage } from '../../features/chatSlice';
import socket from '../../socket';
import CommonBoxWrapper from '../../common/CommonBoxWrapper';
import Messages from './Messages';
import Form from './Form';
import MenuWrapper from '../loggedInComponents/FriendSection/Utilities/MenuWrapper';
// import { useGetUsersQuery } from '../../features/auth/authApiSlice';

const ChatWindow = () => {
	// const { data, isLoading, isError, isSuccess } = useGetUsersQuery();
	const [themeColor, setThemeColor] = useState('blue');
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		const handleReceivedMessage = (message) => {
			dispatch(addMessage(message));
		};

		socket.on('messageRecieved', handleReceivedMessage);
		// clean up to avoid multiple renders

		return () => {
			socket.off('messageRecieved', handleReceivedMessage);
		};
	}, [dispatch]);

	const chatThemeColors = useMemo(
		() => [
			{
				_shade: 'blue',
				background: 'bg-[#1B1A55]',
				border: 'bg-[#070F2B]',
				send_msg: 'bg-[#535C91]',
				receive_msg: 'bg-[#9290C3]',
			},
			{
				_shade: 'green',
				background: 'bg-[#1B4242]',
				border: 'bg-[#092635]',
				send_msg: 'bg-[#78A083]',
				receive_msg: 'bg-[#50727B]',
			},
			{
				_shade: 'red',
				background: 'bg-[#030637]',
				border: 'bg-[#3C0753]',
				send_msg: 'bg-[#720455]',
				receive_msg: 'bg-[#910A67]',
			},
			{
				_shade: 'amber',
				background: 'bg-[#3E3232]',
				border: 'bg-[#503C3C]',
				send_msg: 'bg-[#7E6363]',
				receive_msg: 'bg-[#A87C7C]',
			},
		],
		[]
	);

	const selectedTheme = useMemo(
		() => chatThemeColors.find(({ _shade }) => _shade === themeColor) || chatThemeColors[0],
		[chatThemeColors, themeColor]
	);

	// if (isLoading) {
	// 	return 'Loading...';
	// }

	// if (isError) {
	// 	return 'Something went wrong';
	// }

	// // you can add isFetching to a skeleton of the thing

	// if (isSuccess) {

	const themeColors = ['green', 'sky', 'red', 'amber'];

	return (
		<CommonBoxWrapper additional_class="relative h-full p-5 max-h-[35em]">
			<MenuWrapper
				anchorEl={anchorEl}
				handleClose={handleClose}
				open={open}
				transformOrigin={{ horizontal: 'left', vertical: 'top' }}
			>
				<Box>
					<Stack>
						{themeColors.map((color) => (
							<Button
								key={color}
								className={`capitalize bg-black hover:bg-${color}-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 justify-start gap-2 mb-2 mx-2`}
								variant="contained"
								onClick={() => setThemeColor(color)}
							>
								<Box className={`bg-${color}-500 p-2 my-1 rounded`}>
									<Paper elevation={3} />
								</Box>
								{color}
							</Button>
						))}
					</Stack>
				</Box>
			</MenuWrapper>
			<Button
				variant="contained"
				className="w-2 min-w-8 min-h-8 h-8 m-1 p-0 absolute top-0 left-0 bg-transparent hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 text-white transition ease-in-out hover:scale-110 duration-150"
				onClick={handleClick}
			>
				<img className="w-6 p-0 m-0" src="/svg_icons/theme.svg" alt="theme" />
			</Button>
			<Box className={`bg-opacity-70 rounded h-full ${selectedTheme.background}`}>
				<Messages selectedTheme={selectedTheme} />
				<Form selectedTheme={selectedTheme} />
			</Box>
			<div className={`absolute inset-0 -z-50 ${selectedTheme.border} bg-opacity-70 rounded`}></div>
		</CommonBoxWrapper>
	);
};
// };

export default ChatWindow;
