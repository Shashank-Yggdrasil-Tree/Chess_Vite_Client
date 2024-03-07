import React, { useContext } from 'react';
import { Stack } from '@mui/material';
import { BreakpointContext } from '../../BreakpointProvider';

const ResponsiveStack = ({ children }) => {
	const { xlBreakpoint, smBreakpoint } = useContext(BreakpointContext);

	return (
		<Stack
			className={`flex-1 max-w-[20em] sm:max-w-[31em] md:max-w-[31em] lg:max-w-[29em] xl:max-w-[31em] 2xl:max-w-[31em] bg-[#21201d] h-[44em] justify-center items-center text-white rounded-md ${
				smBreakpoint ? 'min-w-full' : 'mr-5 my-4'
			}`}
		>
			{children}
		</Stack>
	);
};

export default ResponsiveStack;
