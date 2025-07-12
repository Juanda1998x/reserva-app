import { useEffect } from "react";
import { useFetch } from "../Hoocks/UseFetch";
import { useNavigate } from "react-router-dom";
import { getFaIconComponent } from "../Utils/getFaIcon";


export const CharacteristicList = () => {

    const navigate = useNavigate();
    const { fetchData: fetchCharacteristic, error, isLoading, data } = useFetch();

    useEffect(() => {
        fetchCharacteristic('http://localhost:8080/characteristics/all', 'GET');

    }, []);
    const characteristic = Array.isArray(data) ? data : [];

    const { fetchData: fetchDelete } = useFetch();

    const handleDelete = async (characteristicId) => {
        try {
            await fetchDelete(`http://localhost:8080/characteristics/delete/${characteristicId}`, 'DELETE');
            alert('Caracteristica eliminada exitosamente');
            await fetchCharacteristic('http://localhost:8080/characteristics/all', 'GET'); // recarga la lista de características
        } catch (error) {
            console.error('Error al eliminar la característica:', error);
            alert('Error al eliminar la característica. Por favor, inténtalo de nuevo más tarde.');
        }
    }


    return (

        <div className='product-container'>
            <div className="product-title">
                <h1>Lista de Caracteristicas</h1>
                <button className="btn btn-primary" onClick={() => navigate('/admin/crear-caracteristica')}>Crear Nueva</button>
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
                        <th scope="col">id</th>
                        <th scope="col">nombre</th>
                        <th scope="col">Icono</th>
                        <th scope="col">Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr>
                            <td colSpan="4" className="text-center">Cargando...</td>
                        </tr>
                    )}
                    {error && (
                        <tr>
                            <td colSpan="4" className="text-center text-danger">Error al cargar las características: {error.message}</td>
                        </tr>
                    )}

                    {characteristic?.map((car) => {
                        
                        const Icon = getFaIconComponent(car.icon);
                        

                        return (
                            <tr key={car.id}>
                                <td>{car.id}</td>
                                <td>{car.name}</td>
                                <td>{Icon ? <Icon size={20} color="green"/> : 'sin icono' }</td>

                                <td>
                                    <button className="btn btn-primary" onClick={() => navigate(`/admin/editar-caracteristica/${car.id}`)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(car.id)}>Eliminar</button>

                                </td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>

        </div>
    )
}
