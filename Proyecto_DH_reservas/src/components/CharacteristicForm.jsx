import { use, useEffect, useState } from 'react'
import { useFetch } from '../Hoocks/UseFetch';
import '../styles/CharacteristicForm.css';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';

import { FaWifi, FaSwimmer, FaCoffee, FaParking, FaUtensils, FaDumbbell, FaConciergeBell, FaTv, FaSnowflake, FaDog, FaShuttleVan, FaSpa, FaCocktail } from 'react-icons/fa';

const iconOptions = [
  { label: 'Wifi', value: 'wifi', icon: <FaWifi /> },
  { label: 'Piscina', value: 'pool', icon: <FaSwimmer /> },
  { label: 'Café', value: 'coffee', icon: <FaCoffee /> },
  { label: 'Estacionamiento', value: 'parking', icon: <FaParking /> },
  { label: 'Restaurante', value: 'restaurant', icon: <FaUtensils /> },
  { label: 'Gimnasio', value: 'gym', icon: <FaDumbbell /> },
  { label: 'Recepción 24h', value: 'reception', icon: <FaConciergeBell /> },
  { label: 'Televisión', value: 'tv', icon: <FaTv /> },
  { label: 'Aire acondicionado', value: 'air-conditioning', icon: <FaSnowflake /> },
  { label: 'Pet Friendly', value: 'pet-friendly', icon: <FaDog /> },
  { label: 'Transporte al aeropuerto', value: 'airport-shuttle', icon: <FaShuttleVan /> },
  { label: 'Spa', value: 'spa', icon: <FaSpa /> },
  { label: 'Bar', value: 'bar', icon: <FaCocktail /> }
];


const customStyles = {
    option: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    }),
    singleValue: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    }),
}

export const CharacteristicForm = ({mode}) => {

    const isEditMode = mode === 'edit'; // Verifica si el modo es 'edit'
    const {id} = useParams(); // Obtiene el ID de la URL si es necesario
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        icon: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };
    const handleIconSelect = (selectedOption) => {
        setForm({
            ...form,
            icon: selectedOption?.value || ''
        });
    }

    const { fetchData: fetchCharacteristic, error, data } = useFetch();

    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (error) {
            setFormError(error.message);
        } 
        
    }, [error]);

    useEffect(() => {
        if (data) {
           alert('Caracteristica creada exitosamente');
           navigate('/admin/listar-caracteristica'); // Redirigir a la lista de características después de crear una nueva
        }
        if(isEditMode&& data){
            navigate('/admin/listar-caracteristica');
        }
    }, [data, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEditMode ? `http://localhost:8080/characteristics/update/${id}` : 'http://localhost:8080/characteristics/create';
        const method = isEditMode ? 'PUT' : 'POST';
        setFormError(''); // Limpiar errores previos
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a un servidor
        await fetchCharacteristic(
            url,
            method,
            JSON.stringify(form)
        )
    }



    return (
        <div className="characteristic-container">
            <h1>{isEditMode ? 'Editar Caracteristica': 'Crear Caracteristica'}</h1>
            <form className="form-characteristic" onSubmit={handleSubmit}>

                <label htmlFor="name">name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="icon">Icono:</label>
                <Select
                    id="icon"
                    name="icon"
                    options={iconOptions.map(option => ({
                        ...option,
                        label: (
                            <div className='select-icon-option'>
                                {option.icon}
                                {option.label}
                            </div>
                        ),
                    }
                    ))}
                    onChange={handleIconSelect}
                    styles={customStyles}
                    isClearable={true}
                    required
                    placeholder="Selecciona un icono"
                    isSearchable ={false}
                />
                {form.icon && (
                    <div className='icon-preview-box'>
                        <p>vista previa del icono seleccionado</p>
                        <div className='icon-display'>
                            {iconOptions.find(option => option.value === form.icon)?.icon || 'No icon selected'}

                            <span>{form.icon}</span>
                        </div>

                    </div>
                )}

                <input
                    className='submit-button'
                    type="submit"
                    value={isEditMode ? 'Actualizar Caracteristica' : 'Crear Caracteristica'}
                />

            </form>
            {formError && <p className="error-message">{formError}</p>}

        </div>
    )
}
