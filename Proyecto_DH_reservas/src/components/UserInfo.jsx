import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../Context/UserContext';
import '../styles/UserInfo.css';
import { NavLink, useNavigate } from 'react-router-dom';

export const UserInfo = () => {

    const navigate = useNavigate();

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/'); // Redirigir a la página principal después de cerrar sesión
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { user, logout } = useContext(UserContext);

    if (!user) return null;

    const initialsLetters = `${user.name[0] || ''}${user.lastName[0] || ''}`.toUpperCase();
    return (
        <div className="user-infor" ref={menuRef}>
            <div
                className="user-avatar"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {initialsLetters}
            </div>
            {isMenuOpen && (
                <div className="user-menu">
                    <span>{`${user.name} ${user.lastName}`}</span>
                    <ul className="navlist">
                        <li>
                            <NavLink
                                to={'/Favorites-products'}>
                                Favoritos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/my-bookings'}>
                                Mis reservas
                            </NavLink>
                        </li>
                        
                        <li><a onClick={handleLogout} >Cerrar sesión</a></li>
                        
                    </ul>
                </div>
            )}

        </div >
    )
}
