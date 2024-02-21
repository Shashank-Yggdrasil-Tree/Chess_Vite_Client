import { Box, Stack } from '@mui/material';
import React from 'react';
import ChatWindow from '../ChatWindow/ChatWindow';
import Login from '../SignIn/Login';
import { Outlet, useLocation } from 'react-router-dom';
import ResponsiveDrawer from '../Drawer';

const Layout = () => {
	const location = useLocation().pathname;
	//console.log(location);

	return (
		<Stack className="bg-hero-pattern bg-no-repeat bg-center bg-cover h-screen w-screen">
			<Box className="flex h-full w-full ">
				<Box className="flex-none md:flex-1">
					<ResponsiveDrawer />
				</Box>
				<Box className="flex-1 flex items-center">
					<Outlet />
				</Box>
				<Stack className="flex-1">
					<Box>
						<Login />
					</Box>
					<Box className="h-full w-full">
						<ChatWindow />
					</Box>
				</Stack>
			</Box>
		</Stack>
	);
};

export default Layout;
