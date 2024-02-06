import { Box, Grid, Stack } from '@mui/material';
import React from 'react';
// import ChatWindow from '../ChatWindow';
// import Login from '../SignIn/Login';
import { Outlet, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ResponsiveDrawer from '../Drawer';
import ChessMenu from '../loggedInComponents/ChessMenu';

const LayoutIn = () => {
	const location = useLocation().pathname;
	console.log(location);

	const contentNav = <></>;

	const content = (
		<>
			<div className="flex grow">
				<Stack className="h-screen grow max-w-[45.5rem]">
					<Box className="flex h-full flex-1 items-center grow">
						<Outlet />
					</Box>
				</Stack>
				<Stack className="bg-[#21201d] h-screen w-[34%] items-center mr-8 text-white">
					<ChessMenu />
				</Stack>
				<Stack className="bg-purple-900 h-screen items-center flex-none w-[10%] text-white">Find Friends</Stack>
			</div>
		</>
	);

	return (
		<>
			<div class="flex h-screen">
				<div class="flex-none w-36 bg-[#262522]">{contentNav}</div>
				<div class="flex-1 bg-[#302e2b]">{content}</div>
			</div>
		</>
	);
};

export default LayoutIn;
