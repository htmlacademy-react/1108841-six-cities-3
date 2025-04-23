import { Navigate, Outlet } from 'react-router-dom';
import { APP_ROUTE } from '../../const';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

const PrivateRoute = ({ isAuthenticated, redirectPath = APP_ROUTE.LOGIN }: PrivateRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
