import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
	const token = useSelector(selectCurrentToken);
	const location = useLocation();

	return token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};

export default RequireAuth;