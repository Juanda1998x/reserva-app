import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/AdminPage.css'

export const AdminPage = () => {

    const navigate = useNavigate();

    // verifica si la pagina es movil
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isMobile) {
        // Si es móvil, redirige a la página principal
        return (
            <div className='mobile-error'>

                <h2>Esta página no está disponible en dispositivos móviles</h2>

                <button
                    className='back-button'
                    onClick={() => navigate('/')}
                >
                    Volver a la página principal
                </button>
            </div>
        );
    }

    const adminFunctions = [
        { name: 'Agregar Producto', path: '/admin/agregar-producto' },
        { name: 'Agregar categoria', path: '/admin/agregar-categoria' },
        { name: 'Ver Productos', path: '/admin/ver-productos' },
        { name: 'Administrar Caracteristica', path: '/admin/listar-caracteristica' },
        { name: 'Ver Usuarios', path: '/admin/ver-usuarios' }
    ]


    return (
        <div className='admin-container'>

            <div className="admin-title">
                <h1>Panel de adiministracion</h1>
                <button
                    className="admin-back-button"
                    onClick={() => navigate("/")}
                >
                    X
                </button>

            </div>
            <div className='admin-grid'>
                {adminFunctions.map((funcion) => (
                    <button
                        key={funcion.path}
                        className='admin-function-btn'
                        onClick={() => navigate(funcion.path)}
                    >
                        {funcion.name}
                    </button>
                ))}
            </div>
        </div>
    )
}
