import React, { useState } from 'react';
import TooltipWrapper from './TooltipWrapper';
import { Button } from '@mui/material';
import { useLogoutQuery } from '../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import socket from '../socket';

const LogoutButton = ({ className, imgClassName, tooltipClassName = null }) => {
	const [skip, setSkip] = useState(true);
	const { data, error, status } = useLogoutQuery(undefined, { skip });

	const handleLogout = () => {
		socket.emit('logout');
		setSkip((prev) => !prev);
	};
	return (
		<>
			<TooltipWrapper className={tooltipClassName} tooltipContent="Logout" placement="right">
				<Button className={className} onClick={handleLogout}>
					<img className={imgClassName} src="/svg_icons/logout.svg" alt="Logout" />
				</Button>
			</TooltipWrapper>
		</>
	);
};

export default LogoutButton;
