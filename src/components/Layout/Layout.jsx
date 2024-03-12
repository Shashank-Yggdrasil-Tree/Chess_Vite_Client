import { Box, Stack } from '@mui/material';
import React, { useContext } from 'react';
import ChatWindow from '../ChatWindow/ChatWindow';
import Login from '../SignIn/Login';
import { Outlet, useLocation } from 'react-router-dom';
import ResponsiveDrawer from '../Drawer';
import { BreakpointContext } from '../../BreakpointProvider';

const Layout = () => {
	const { mdBreakpoint, lgBreakpoint } = useContext(BreakpointContext);

	return (
		<Stack
			className={`bg-no-repeat bg-center bg-cover w-screen ${mdBreakpoint ? 'h-full bg-mobile-wallpaper1' : 'h-screen bg-hero-pattern'}`}
		>
			<Box
				className={`flex h-full w-full bg-black bg-opacity-60 backdrop-blur-[3px] ${mdBreakpoint ? 'flex-col' : null}`}
			>
				<Box className={`flex-none md:flex-1`}>
					<ResponsiveDrawer />
				</Box>
				<Box className="flex-1 flex items-center h-screen grow">
					<Outlet />
				</Box>
				<Stack className={`flex-1`}>
					<Box>
						<Login />
					</Box>
					<Box className={`h-full w-full ${mdBreakpoint ? 'h-[30em]' : null}`}>
						<ChatWindow />
					</Box>
				</Stack>
			</Box>
		</Stack>
	);
};

export default Layout;
