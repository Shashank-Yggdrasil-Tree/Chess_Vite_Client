import { Menu } from '@mui/material';
import React from 'react';
import './GlobalCssMenu.css';

const MenuWrapper = ({
	children,
	handleClose,
	anchorEl,
	open,
	transformOrigin = { horizontal: 'right', vertical: 'top' },
	anchorOrigin = { horizontal: 'right', vertical: 'bottom' },
}) => {
	return (
		<Menu
			anchorEl={anchorEl}
			id="account-menu"
			open={open}
			transformOrigin={transformOrigin}
			anchorOrigin={anchorOrigin}
			onClose={handleClose}
			children={children}
			// style={{ backdropFilter: 'blur(1000px)' }}
		></Menu>
	);
};

export default MenuWrapper;
