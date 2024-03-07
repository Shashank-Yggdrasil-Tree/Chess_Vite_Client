import React, { useState } from 'react';
import TooltipWrapper from './TooltipWrapper';
import { Button } from '@mui/material';
import { useLogoutQuery } from '../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import socket from '../socket';

const LogoutButton = () => {
	const [skip, setSkip] = useState(true);
	const { data, error, status } = useLogoutQuery(undefined, { skip });

	const handleLogout = () => {
		socket.emit('logout');
		setSkip((prev) => !prev);
	};
	return (
		<>
			<TooltipWrapper tooltipContent="Logout" placement="right">
				<Button className="absolute left-0 top-0 " onClick={handleLogout}>
					<img
						className="absolute top-0 left-0 w-8 m-2 cursor-pointer transition ease-in-out hover:scale-110 duration-150"
						src="/svg_icons/logout.svg"
						alt="Logout"
					/>
				</Button>
			</TooltipWrapper>
		</>
	);
};

export default LogoutButton;
