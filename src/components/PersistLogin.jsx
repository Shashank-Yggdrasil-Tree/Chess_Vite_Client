import useRefreshToken from '../hooks/useRefreshToken';
import { Outlet } from 'react-router-dom';
import React, { useState, useEffect, useMemo, memo } from 'react';
import { selectCurrentAuth, selectCurrentPersist } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';

// import useAuth from '../hooks/useAuth
let renderCount = 0;

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	// const [skip, setSkip] = useState(true);
	// const { data, error, status } = useRefreshTokenQuery(undefined, { skip });
	// const dispatch = useDispatch();
	const refresh = useRefreshToken();
	const auth = useSelector(selectCurrentAuth);
	const persist = useSelector(selectCurrentPersist);

	// wait a min..

	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				renderCount++;
				console.log(`render count: ${renderCount}`);
				await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		console.log(auth?.accessToken);
		console.log(persist);

		// persist added here AFTER tutorial video
		// Avoids unwanted call to verifyRefreshToken
		!auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

		return () => (isMounted = false);
	}, []);

	useEffect(() => {
		console.log(`isLoading: ${isLoading}`);
		console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
		console.log(`persist: ${persist}`);
		console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
	}, [isLoading]);

	return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
