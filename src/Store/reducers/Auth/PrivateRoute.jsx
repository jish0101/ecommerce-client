import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectRole } from './authSelector';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ roles }) {
  const role = useSelector(selectRole);
  console.log('🚀 ~ PrivateRoute ~ roles:', roles);
  console.log('🚀 ~ PrivateRoute ~ role:', role);
  const isAuthenticatedRedux = useSelector(selectIsAuth);
  const location = useLocation();

  if (!isAuthenticatedRedux) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // eslint-disable-next-line react/prop-types
  if (roles && Array.isArray(roles) && !roles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
