import { useDispatch } from 'react-redux';
import axios from '../app/api/axios';
import { setCredentials } from '../features/auth/authSlice';
import socket from '../socket';

const useRefreshToken = () => {
	const dispatch = useDispatch();
	const refresh = async () => {
		const response = await axios.get('/refresh', {
			withCredentials: true,
		});
		dispatch(setCredentials({ user: response.data.user, accessToken: response.data.accessToken }));
		socket.emit('username', response.data.user);
		return response.data.accessToken;
	};
	return refresh;
};

export default useRefreshToken;
