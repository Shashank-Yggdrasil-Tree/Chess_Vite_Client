import React, { useEffect, useState } from 'react';
import useWindowDimensions from './hooks/useWindowDimension';

// need to refactor this code.

// Define your breakpoint values
const smBreakpointValue = 640;
const mdBreakpointValue = 768;
const lgBreakpointValue = 1024;
const xlBreakpointValue = 1250;
const xxlBreakpointValue = 1536;

const BreakpointProvider = ({ children }) => {
	const { width } = useWindowDimensions();
	const [breakpoints, setBreakpoints] = useState({
		xxlBreakpoint: false,
		xlBreakpoint: false,
		lgBreakpoint: false,
		mdBreakpoint: false,
		smBreakpoint: false,
	});

	useEffect(() => {
		const updatedBreakpoints = {
			xxlBreakpoint: width <= xxlBreakpointValue,
			xlBreakpoint: width <= xlBreakpointValue,
			lgBreakpoint: width <= lgBreakpointValue,
			mdBreakpoint: width <= mdBreakpointValue,
			smBreakpoint: width <= smBreakpointValue,
		};

		setBreakpoints(updatedBreakpoints);
	}, [width]);

	return <BreakpointContext.Provider value={breakpoints}>{children}</BreakpointContext.Provider>;
};

export const BreakpointContext = React.createContext();
export default BreakpointProvider;
