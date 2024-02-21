import { Button } from '@mui/material';
import React from 'react';

const CustomButton = ({ id, children, handleClick, contained = true, type = 'button', disabled = false }) => {
	return (
		<Button
			id={id}
			type={type}
			variant={contained ? 'contained' : 'text'}
			disabled={disabled}
			className={` bg-violet-800 focus:outline-none focus:ring focus:ring-violet-300 hover:bg-gradient-to-r from-violet-800 to-fuchsia-700 hover:text-white transition ease-in-out hover:scale-110 duration-150 ml-2`}
			onClick={handleClick}
		>
			{children}
		</Button>
	);
};

export default CustomButton;
