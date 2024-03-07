import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../features/auth/authSlice.jsx';
import { selectCurrentPersist } from '../../features/auth/authSlice.jsx';
import Navigation from '../loggedInComponents/Navigation/Navigation.jsx';

import SignIn from './SignIn.jsx';
import CommonBoxWrapper from '../../common/CommonBoxWrapper.jsx';
import { BreakpointContext } from '../../BreakpointProvider.jsx';
import { Button } from '@mui/material';

const Login = ({ setCollapse, collapse }) => {
	// const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const token = useSelector(selectCurrentToken);
	const persist = useSelector(selectCurrentPersist);
	const { xlBreakpoint, smBreakpoint } = useContext(BreakpointContext);

	useEffect(() => {
		//console.log('persist is changed', persist);
		localStorage.setItem('persist', persist);
	}, [persist]);

	return (
		<>
			{!token ? (
				<CommonBoxWrapper
					additional_class="h-48 relative"
					border_color="border-2 border-zinc-800 hover:border-violet-800"
				>
					<SignIn />
				</CommonBoxWrapper>
			) : (
				<>
					<Navigation collapse={collapse} setCollapse={setCollapse} />
				</>
			)}
		</>
	);
};

export default Login;
