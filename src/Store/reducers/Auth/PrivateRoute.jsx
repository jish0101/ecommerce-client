import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectIsTrusted, selectRole } from './authSelector';

function PrivateRoute({ roles }) {
  const role = useSelector(selectRole);
  const isAuthenticatedRedux = useSelector(selectIsAuth);
  const location = useLocation();

  if (!isAuthenticatedRedux) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (roles && Array.isArray(roles) && !roles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
