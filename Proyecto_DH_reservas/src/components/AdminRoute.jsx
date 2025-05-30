import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export const AdminRoute = () => {

    const {currentUser} = useAuth();
    if (!currentUser || !currentUser.role !== 'ADMIN') {
        return <Navigate to="/login" replace />; // Redirige a la página de inicio de sesión si no es un administrador
    }

  return (
    <Outlet />
  )
}
