import React, { useEffect, useState } from 'react'
import { useFetch } from '../Hoocks/UseFetch';
import { ProductContext } from './ProductContext';

export const ProductProvider = ({ children }) => {

    // productos aleatorios
    const randomUrl = 'http://localhost:8080/product'
    const { data: randomProducts, isLoading, error, fetchData } = useFetch();

    // productos paginados
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [productsPerPage] = useState(10);

    //cargar productos aleatorios al cargar el componente
    useEffect(() => {
        fetchData(randomUrl, 'GET')
        fetchPaginated(0); // Cargar la primera página de productos paginados
    }, [])

    // funcion para traer productos paginados
    const fetchPaginated = async (page) => {
        try {
            const res = await fetch(`http://localhost:8080/product/paginated?page=${page}&size=${productsPerPage}`);
            const data = await res.json();
            setPaginatedProducts(data.content);
            setCurrentPage(data.number);
            setTotalPages(data.totalPages);

        } catch (error) {
            console.error('Error al obtener productos :', error);
        }
    }

    const paginate = (page) => {
        fetchPaginated(page);
    }

    return (
        <ProductContext.Provider value={{
            randomProducts,
            isLoading,
            error,
            paginatedProducts,
            currentPage,
            totalPages,
            productsPerPage,
            paginate
        }}>

            {children}
        </ProductContext.Provider>
    )
}
