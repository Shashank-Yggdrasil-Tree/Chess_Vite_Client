import React, { useContext } from 'react';
import { Stack } from '@mui/material';
import { BreakpointContext } from '../../BreakpointProvider';

const ResponsiveStack = ({ children }) => {
	const { lgBreakpoint } = useContext(BreakpointContext);

	return (
		<Stack
			className={`flex-1 max-w-[20em] sm:max-w-[31em] md:max-w-[31em] lg:max-w-[18em] xl:max-w-[31em] 2xl:max-w-[31em] bg-[#21201d] max-h-full justify-center items-center text-white rounded-md ${
				lgBreakpoint ? 'min-w-full' : 'my-4'
			}`}
		>
			{children}
		</Stack>
	);
};

export default ResponsiveStack;
