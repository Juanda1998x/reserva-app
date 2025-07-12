
import '../Styles/ProductList.css'
import { useFetch } from '../Hoocks/UseFetch';
import { use, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductList = () => {

    const { data, isLoading, error, fetchData } = useFetch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData('http://localhost:8080/product/all', 'GET');
        
    }, []);

    const [productToDelete, setProductToDelete] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = (productId) => {
        setProductToDelete(productId);
        setShowConfirm(true);
    }

    const products = Array.isArray(data) ? data : [];

    const confirmDelete = async () => {

        try {
            await fetchData(`http://localhost:8080/product/${productToDelete}`, 'DELETE');
            const updateProducts = await fetchData('http://localhost:8080/product/all', 'GET'); // recarga los product list

            setShowConfirm(false);

        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            alert('Error al eliminar el producto. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setShowConfirm(false);
        }
    }


    return (
        <div className='product-container'>
            <div className="product-title">
                <h1>Lista de Productos</h1>
                <button
                    className="back-button"
                    onClick={() => navigate("/admin")}
                >
                    X
                </button>

            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">categoria</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <tr><td colSpan="3">Cargando...</td></tr>
                        : error ? <tr><td colSpan="3">Error: {error.message}</td></tr>
                            :
                            products?.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category?.name || 'sin categoria'}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={()=> navigate(`/admin/editar/${product.id}`)}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                </tbody>

            </table>
            {showConfirm && (
                <div className="confirm-delete-modal">
                    <p>¿Estás seguro de que quieres eliminar este producto?</p>
                    <button className="btn btn-danger" onClick={confirmDelete}>Confirmar</button>
                    <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancelar</button>
                </div>
            )}


        </div>
    )
}
