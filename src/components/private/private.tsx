import { Navigate, Outlet } from 'react-router-dom';
import { AuthorizationStatus } from '../../types/state';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  redirectPath: string;
};

function PrivateRoute({ authorizationStatus, redirectPath }: PrivateRouteProps): JSX.Element {
  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
