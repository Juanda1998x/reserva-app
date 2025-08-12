import { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Función para decodificar el token JWT y extraer el payload
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error parsing JWT:", error);
      return null;
    }
  };

  // Función de login que guarda usuario y token en localStorage
  const login = (userData) => {
    const payload = parseJwt(userData.token);
    const role = payload?.role || null;

    const userWithRole = { ...userData, role };

    setUser(userWithRole);
    localStorage.setItem('user', JSON.stringify(userWithRole));
    localStorage.setItem('token', userData.token);
  };

  // Función de logout que limpia todo
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  // Efecto para restaurar el rol desde el token guardado si el usuario existe
  useEffect(() => {
    if (user && !user.role) {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = parseJwt(token);
        const role = payload?.role || null;
        if (role) {
          const updatedUser = { ...user, role };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
