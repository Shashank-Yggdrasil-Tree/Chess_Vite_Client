import React, { useEffect, useState } from 'react';
import useWindowDimensions from './hooks/useWindowDimension';

// Define your breakpoint values
const xlBreakpointValue = 1250;
const smBreakpointValue = 640;

const BreakpointProvider = ({ children }) => {
	const [xlBreakpoint, setXlBreakpoint] = useState(false);
	const [smBreakpoint, setSmBreakpoint] = useState(false);
	const { width } = useWindowDimensions();

	useEffect(() => {
		if (width <= xlBreakpointValue) {
			setXlBreakpoint(true);
		} else {
			setXlBreakpoint(false);
		}

		if (width <= smBreakpointValue) {
			setSmBreakpoint(true);
		} else {
			setSmBreakpoint(false);
		}
	}, [width]);

	return <BreakpointContext.Provider value={{ xlBreakpoint, smBreakpoint }}>{children}</BreakpointContext.Provider>;
};

export const BreakpointContext = React.createContext();
export default BreakpointProvider;
