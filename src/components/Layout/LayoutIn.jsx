import { Box, Grid, Stack } from '@mui/material';
import React from 'react';
// import ChatWindow from '../ChatWindow';
import Login from '../SignIn/Login';
import { Outlet, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ResponsiveDrawer from '../Drawer';
import Menu from '../loggedInComponents/Menu/Menu';
import FriendSection from '../loggedInComponents/FriendSection/FriendSection';

const LayoutIn = () => {
	const location = useLocation().pathname;
	//console.log(location);

	const contentNav = (
		<>
			<Login />
		</>
	);

	const content = (
		<>
			<div className="flex grow">
				<Stack className="h-screen grow max-w-[53%] min-w-96">
					<Box className="flex h-full flex-1 items-center grow">
						<Outlet />
					</Box>
				</Stack>

				<Stack className="bg-[#21201d] w-[34%] max-h-[44em] items-center mr-5 my-4 text-white min-w-96 rounded-md">
					<Menu />
				</Stack>

				<Stack className="w-[13.5%] flex-none">
					<FriendSection />
				</Stack>
			</div>
		</>
	);

	return (
		<>
			<div className="flex h-screen">
				<div className="flex-none w-36 bg-[#21201d]">{contentNav}</div>
				<div className="flex-1 bg-[#302e2b]">{content}</div>
			</div>
		</>
	);
};

export default LayoutIn;
