import { Box, Stack } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import ChatWindow from '../ChatWindow/ChatWindow';
import Login from '../SignIn/Login';
import { Outlet, useLocation } from 'react-router-dom';
import ResponsiveDrawer from '../Drawer';
import { BreakpointContext } from '../../BreakpointProvider';
import { toast } from 'react-toastify';

const Layout = () => {
	const { mdBreakpoint, smBreakpoint } = useContext(BreakpointContext);

	useEffect(() => {
		const showToast = () => {
			toast.info(
				<>
					Developer - "Thank you for visiting! Please wait or just try to log in once, If you do not see any toast like
					this saying "Invalid Credentials" (or something similar) then just wait and refresh this page after 50
					seconds, as I am using a free-tier server on Render, and it takes time to start their instance"
					<br />
					<br />
					"And then, try creating a new account and have fun exploring!"
				</>,
				{
					position: 'bottom-right',
					autoClose: false,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
					icon: false,
				}
			);
		};

		showToast();
	}, []);

	return (
		<Stack
			className={`bg-no-repeat bg-center bg-cover w-screen ${mdBreakpoint ? 'h-full bg-mobile-wallpaper1' : 'h-screen bg-hero-pattern'}`}
		>
			<Box
				className={`flex h-full w-full bg-black bg-opacity-60 backdrop-blur-[3px] ${mdBreakpoint ? 'flex-col' : null}`}
			>
				{smBreakpoint ? (
					<>
						<Box className={`flex-1 flex items-center h-screen grow  ${mdBreakpoint ? 'min-h-screen' : null}`}>
							<Box className={`absolute top-0 left-0`}>
								<ResponsiveDrawer />
							</Box>
							<Outlet />
						</Box>
					</>
				) : (
					<>
						<Box className={`flex-none md:flex-1`}>
							<ResponsiveDrawer />
						</Box>
						<Box className={`flex-1 flex items-center h-screen grow  ${mdBreakpoint ? 'min-h-screen' : null}`}>
							<Outlet />
						</Box>
					</>
				)}
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
