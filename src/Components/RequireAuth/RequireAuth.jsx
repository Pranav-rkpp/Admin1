import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return (
    isLoggedIn
      ? <Outlet />
      : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth