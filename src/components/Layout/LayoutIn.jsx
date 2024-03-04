import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import Login from '../SignIn/Login';
import { Outlet } from 'react-router-dom';
import Menu from '../loggedInComponents/Menu/Menu';
import FriendSection from '../loggedInComponents/FriendSection/FriendSection';
import useWindowDimensions from '../../hooks/useWindowDimension';

const LayoutIn = () => {
	const [collapse, setCollapse] = useState(false);
	const { width, height } = useWindowDimensions();

	const responsiveNavClass = collapse ? 'hidden md:block md:w-11 lg:w-11' : 'hidden md:block md:w-36 lg:w-36';

	const contentNav = (
		<>
			<Login collapse={collapse} setCollapse={setCollapse} />
		</>
	);

	const content = (
		<>
			<div className="flex grow">
				<Box className="flex flex-1 justify-center items-center h-screen w-full grow w-96">
					<Outlet />
				</Box>

				<Stack className="flex-1 max-w-[28em] bg-[#21201d] h-[44em] items-center mr-5 my-4 text-white rounded-md">
					<Menu />
				</Stack>

				<Stack className="flex-none">
					<FriendSection />
				</Stack>
			</div>
		</>
	);

	return (
		<>
			<div className="flex h-screen">
				<div className={`flex-none bg-[#262522] ${responsiveNavClass}`}>{contentNav}</div>
				<div className="flex-1 bg-[#302e2b]">{content}</div>
			</div>
		</>
	);
};

export default LayoutIn;
