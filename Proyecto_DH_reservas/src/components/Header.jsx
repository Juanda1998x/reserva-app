import '../Styles/header.css';
import { NavLink } from "react-router-dom";
import React, { useContext, useState } from 'react';
import { UserInfo } from './UserInfo';
import { UserContext } from '../Context/UserContext';

export const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const { user } = useContext(UserContext);

    return (
        <header className="header">
            <div className="header-left">
                <a href="/" className="logo">
                    <img src="/logo3.png" alt="logo" />
                </a>
                <span>Sientete en casa</span>
            </div>
            {!user && (
            <button className={`hamburguer ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
            )}

            <div className={`header-right${isMenuOpen ? ' open' : ''}`}>
                {/* Mostrar botones solo si NO hay usuario */}
                {!user && (
                    <>
                        <NavLink
                            to="/auth/register"
                            className="nav-link"
                            aria-current="page"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <button className="btn">Crear cuenta</button>
                        </NavLink>
                        <NavLink
                            to="/auth/login"
                            className="nav-link"
                            aria-current="page"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <button className="btn">Iniciar sesión</button>
                        </NavLink>
                    </>
                )}

                {/* Mostrar botón de admin solo si es ROLE_ADMIN */}
                {user?.role === 'ROLE_ADMIN' && (
                    <NavLink
                        to="/admin"
                        className="nav-link"
                        aria-current="page"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <button className="btn">Panel administrador</button>
                    </NavLink>
                )}
            </div>

            {/* Mostrar info de usuario solo si está logueado */}
            {user && (
                <div className="info">
                    <UserInfo />
                </div>
            )}
        </header>
    );
};

