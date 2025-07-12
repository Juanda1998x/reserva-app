import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../Hoocks/UseFetch';

export const ListUserPage = () => {

    const navigate = useNavigate();


    const { data: users, isLoading, error, fetchData: fetchUsers } = useFetch();
    const URL = 'http://localhost:8080/user/all';

    useEffect(() => {
        fetchUsers(URL, 'GET');
    }, []);

    const { data: role, error: errorRole, fetchData: changeRole } = useFetch();

    const handleChangeRole = (userId,  roleActual) => {

        const newRole = roleActual === 'USER' ? 'ADMIN' : 'USER'; // Cambia el rol entre USER y ADMIN

        changeRole(`http://localhost:8080/user/${userId}/cambiar-role?nuevoRole=${newRole}`, 'PUT');
        if (roleActual === newRole) {
            alert('El usuario ya tiene el rol seleccionado');
           
            
        }else {
            alert(`El rol del usuario ha sido cambiado a ${newRole}`);
            fetchUsers(URL, 'GET'); // recarga la lista de usuarios
        }

    }

    return (

        <div className='product-container'>
            <div className="product-title">
                <h1>Lista de Usuarios</h1>
                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    X
                </button>

            </div>
            {isLoading && <p>Cargando usuarios...</p>}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">nombre</th>
                        <th scope="col">apellido</th>
                        <th scope="col">email</th>
                        <th scope="col">rol</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <tr><td colSpan="3">Cargando...</td></tr>
                        : error ? <tr><td colSpan="3">Error: {error.message}</td></tr>
                            :
                            users?.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleChangeRole(user.id,user.role)}>Cambiar Role </button>

                                    </td>
                                </tr>
                            ))}
                </tbody>

            </table>

        </div>
    )
}
