import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

export const AdminRoute = () => {
  const { user } = useContext(UserContext);

  // Si no hay usuario o no es admin → redirige al login
  if (!user || user.role !== 'ROLE_ADMIN') {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};