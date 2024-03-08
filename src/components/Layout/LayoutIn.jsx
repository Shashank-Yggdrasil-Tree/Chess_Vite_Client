import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import Login from '../SignIn/Login';
import { Outlet } from 'react-router-dom';
import Menu from '../loggedInComponents/Menu/Menu';
import FriendSection from '../loggedInComponents/FriendSection/FriendSection';
import { BreakpointContext } from '../../BreakpointProvider';
import ResponsiveStack from './ResponsiveStack';
import LogoutButton from '../../common/LogoutButton';

import NotificationsIcon from '@mui/icons-material/Notifications';
import TooltipWrapper from '../../common/TooltipWrapper';
import MenuWrapper from '../loggedInComponents/FriendSection/Utilities/MenuWrapper';
import ChallengeList from '../loggedInComponents/Challenges/ChallengeList';
import socket from '../../socket';

const LayoutIn = () => {
	const [collapse, setCollapse] = useState(false);
	const [isNavHidden, setIsNavHidden] = useState(false);
	const [challenges, setChallenges] = useState([]);

	useEffect(() => {
		socket.on('challenge', ({ roomId, challenger }) => {
			setChallenges((prevChallenges) => [...prevChallenges, { roomId, challenger }]);
		});
	}, []);

	const { xlBreakpoint, smBreakpoint } = useContext(BreakpointContext);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		if (smBreakpoint) {
			setIsNavHidden(true);
		}
	}, [smBreakpoint]);

	const hideNavClass = isNavHidden ? 'hidden' : null;

	const responsiveNavClass = collapse
		? `${hideNavClass} md:block md:w-11 lg:w-11`
		: `${hideNavClass} md:block md:w-36 lg:w-36`;

	const NotificationMenu = () => {
		return (
			<>
				<MenuWrapper
					anchorEl={anchorEl}
					handleClose={handleClose}
					open={open}
					transformOrigin={{ horizontal: 'left', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
				>
					<ChallengeList challenges={challenges} setChallenges={setChallenges} />
				</MenuWrapper>
			</>
		);
	};

	const mobileDisplayButtons = (
		<>
			<Stack direction="row" className="absolute top-0 left-0">
				<LogoutButton
					className="p-2 min-w-8 "
					imgClassName="w-8 cursor-pointer transition ease-in-out hover:scale-110 duration-150"
				/>
				<TooltipWrapper tooltipContent="Notification" placement="right">
					<Button className="p-2 min-w-8" onClick={handleClick}>
						<img
							className="w-8 cursor-pointer rounded transition ease-in-out hover:scale-110 duration-150 transform transition-transform duration-200 ease-in-out hover:scale-125 hover:bg-green-500"
							src="/svg_icons/notification.svg"
							alt="Logout"
						/>
					</Button>
				</TooltipWrapper>
			</Stack>
		</>
	);

	const contentNav = (
		<>
			<Login collapse={collapse} setCollapse={setCollapse} />
		</>
	);

	const content = (
		<>
			<div className={`flex grow ${xlBreakpoint ? 'flex-col justify-center w-full' : 'flex-row'}`}>
				<Box className={`flex flex-1 justify-center items-center grow w-full ${xlBreakpoint ? 'h-full' : 'h-screen'}`}>
					{smBreakpoint ? mobileDisplayButtons : null}
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
				<NotificationMenu />
				<div className={`flex-none bg-[#262522] ${responsiveNavClass}`}>{contentNav}</div>
				<div className={`flex-1 bg-[#302e2b] h-full`}>{content}</div>
			</div>
		</>
	);
};

export default LayoutIn;
