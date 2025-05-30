import React, { useContext } from 'react'
import { ProductContext } from '../Context/ProductContext';
import '../Styles/Pagination.css';

export const Pagination = () => {
    const { currentPage, totalPages, paginate } = useContext(ProductContext);
   
    return (
        // Componente de paginación
        // Se utiliza para navegar entre las páginas de productos
        // Se muestra un botón para ir a la primera página, un botón para ir a la página anterior y botones numerados para cada página
        // Se deshabilitan los botones de "Inicio" y "Anterior" si estamos en la primera página

        <div className='pagination'>
            <button
                className='prev-button'
                onClick={() => paginate(0)}
                disabled={currentPage === 0}
            >
                Inicio
            </button>
            <button

                className='prev-button'
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 0}
            >
                Anterior
            </button>
            
            <span>
                Página {currentPage + 1} de {totalPages}
            </span>
           
            <button
                className='next-button'
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
            >
                Siguiente
            </button>
            <button
                className='last-button'
                onClick={() => paginate(totalPages - 1)}
                disabled={currentPage === totalPages - 1}
            >
                Final
            </button>

        </div>
    )
}
