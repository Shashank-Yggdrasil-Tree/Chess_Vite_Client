import { useEffect } from 'react';
import SignIn from './SignIn.jsx';
import InitGame from '../InitGame.jsx';
import { useSelector } from 'react-redux';
import CommonBoxWrapper from '../../common/CommonBoxWrapper.jsx';
import { selectCurrentToken } from '../../features/auth/authSlice.jsx';
import { selectCurrentPersist } from '../../features/auth/authSlice.jsx';

const Login = () => {
	// const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const token = useSelector(selectCurrentToken);
	const persist = useSelector(selectCurrentPersist);

	useEffect(() => {
		//console.log('persist is changed', persist);
		localStorage.setItem('persist', persist);
	}, [persist]);

	return (
		<CommonBoxWrapper additional_class="h-48 relative" border_color="border-2 border-zinc-800 hover:border-violet-800">
			{token ? <InitGame /> : <SignIn />}
		</CommonBoxWrapper>
	);
};

export default Login;
