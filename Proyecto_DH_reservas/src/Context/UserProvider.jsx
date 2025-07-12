import { useState } from 'react'
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

export const UserProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // funcion para actualizar el usuario y guardarlo en localStorage
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token); // Guardar el token si es necesario
    };

    // funcion para cerrar sesion y eliminar el usuario de localStorage
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Eliminar el token si es necesario
        navigate('/');
    };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}


