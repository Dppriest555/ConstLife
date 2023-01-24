import { Navigate, Outlet, useLocation } from 'react-router-dom';
import UseAuth from './UseAuth';

const AuthWrapper = () => {
    const location = useLocation();
    const { currentUser } = UseAuth();

    if (currentUser === undefined) return null;

  return currentUser
        ? <Outlet />
        : <Navigate to="/signin" replace state={{ from: location }} />
}

export default AuthWrapper