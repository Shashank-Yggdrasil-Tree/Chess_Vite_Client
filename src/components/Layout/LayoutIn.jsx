import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import Login from '../SignIn/Login';
import { Outlet } from 'react-router-dom';
import Menu from '../loggedInComponents/Menu/Menu';
import FriendSection from '../loggedInComponents/FriendSection/FriendSection';
import { BreakpointContext } from '../../BreakpointProvider';
import ResponsiveStack from './ResponsiveStack';
import LogoutButton from '../../common/LogoutButton';

const LayoutIn = () => {
	const [collapse, setCollapse] = useState(false);
	const [isNavHidden, setIsNavHidden] = useState(false);
	const { xlBreakpoint, smBreakpoint } = useContext(BreakpointContext);

	useEffect(() => {
		if (smBreakpoint) {
			setIsNavHidden(true);
		}
	}, [smBreakpoint]);

	const responsiveNavClass = collapse
		? `${isNavHidden ? 'hidden' : null} md:block md:w-11 lg:w-11`
		: `${isNavHidden ? 'hidden' : null} hidden md:block md:w-36 lg:w-36`;

	const contentNav = (
		<>
			<Login collapse={collapse} setCollapse={setCollapse} />
		</>
	);

	const content = (
		<>
			<div className={`flex grow ${xlBreakpoint ? 'flex-col justify-center w-full' : 'flex-row'}`}>
				<Box className={`flex flex-1 justify-center items-center grow w-full ${xlBreakpoint ? 'h-full' : 'h-screen'}`}>
					{smBreakpoint ? <LogoutButton /> : null}
					<Outlet />
				</Box>
				{!xlBreakpoint ? (
					<Box className="flex">
						<ResponsiveStack>
							<Menu />
						</ResponsiveStack>
						<Stack className="flex-none">
							<FriendSection />
						</Stack>
					</Box>
				) : (
					<>
						<Stack className="flex-none">
							<FriendSection />
						</Stack>
						<ResponsiveStack>
							<Menu />
						</ResponsiveStack>
					</>
				)}
			</div>
		</>
	);

	return (
		<>
			<div className={`flex ${smBreakpoint ? 'h-full' : 'h-screen'}`}>
				<div className={`flex-none bg-[#262522] ${responsiveNavClass}`}>{contentNav}</div>
				<div className={`flex-1 bg-[#302e2b] h-full`}>{content}</div>
			</div>
		</>
	);
};

export default LayoutIn;
