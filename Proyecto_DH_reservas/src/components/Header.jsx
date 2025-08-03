import '../Styles/header.css';
import { NavLink } from "react-router"
import React, { use, useContext, useState } from 'react';
import { UserInfo } from './UserInfo';
import { UserContext } from '../Context/UserContext';
import { div } from 'framer-motion/client';
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
                    <img src="/logo3.png" alt="" />
                </a>
                <span >
                    Sientete en casa
                </span>

            </div>

            <button className={`hamburguer ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>

                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>

            </button>

            <div className={`header-right${isMenuOpen ? ' open' : ''}`}>

                <NavLink
                    to={'/auth/register'}
                    className="nav-link "
                    aria-current="page"
                    onClick={() => setIsMenuOpen(false)}>
                    <button
                        className='btn'>
                        Crear cuenta
                    </button>
                </NavLink>
                <NavLink
                    to={'/auth/login'}
                    className="nav-link "
                    aria-current="page"
                    onClick={() => setIsMenuOpen(false)}>
                    <button
                        className='btn'>
                        Iniciar sesión
                    </button>
                </NavLink>
                {user?.role === 'ROLE_ADMIN' &&
                    <NavLink
                        to={'/admin'}
                        className="nav-link "
                        aria-current="page"
                        onClick={() => setIsMenuOpen(false)}>
                        <button
                            className='btn'>
                            panel administrador
                        </button>

                    </NavLink>
                }

            </div>
            {user &&
                <div className=" info">
                    <UserInfo />
                </div>
            }

        </header>

    )
}
