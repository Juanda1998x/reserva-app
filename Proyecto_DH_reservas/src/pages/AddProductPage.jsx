import React, { useState } from 'react'
import { useFetch } from '../Hoocks/UseFetch';
import '../Styles/AddProductPage.css';
import { NavLink, useNavigate } from 'react-router-dom';

export const AddProductPage = () => {

  const navigate = useNavigate(); // hook para navegar a otras paginas

  const url = 'http://localhost:8080/product'; // URL de la API a la que se enviarán los datos del formulario

  // guarda una lista de archivos seleccionados por el usuario
  const [Imagenes, setImagenes] = useState([]);

  // guarda el estado del formulario
  const [form, setForm] = useState({
    name: '',
    description: ''

  });

  const { data, isLoading, error, fetchData } = useFetch();

  // guarda los cambios en los campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  // guarda las imagenes seleccionadas por el usuario
  const handleFileChange = (e) => {
    setImagenes([...e.target.files]);
  };

  const handleSubmit = (e) => {
    // evita que la pagina se recargue al enviar el formulario
    e.preventDefault();

    const formData = new FormData(); // crea un nuevo objeto FormData para enviar los datos del formulario


    formData.append('name', form.name); // agrega el nombre del producto al objeto FormData
    formData.append('description', form.description); // agrega la descripcion del producto al objeto FormData

    // agrega las imagenes seleccionadas al objeto FormData
    Imagenes.forEach((img) => {
      formData.append('images', img);
    });

    // llama al hoock perzonalizado para hacer la peticion POST
    fetchData(url, 'POST', formData);
  }

  return (
    <div className='AddProductContainer'>
      <div className='AddProductForm'>
        <h1>Agregar Producto</h1>

        <button
          className="volver"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>


        <form className='formulario' onSubmit={handleSubmit} encType="multipart/form-data">

          <label>Nombre:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required minLength={3} autoComplete='off' />

          <label>Descripción:</label>
          <input type="text" name="description" value={form.description} onChange={handleChange} required autoComplete='off' />

          <label>Imagenes:</label>
          <input type="file" multiple onChange={handleFileChange} required />

          <button type="submit" className='btn-guardar'>
            Guardar
          </button>
        </form>
      </div>
      {error && <p className='error'>Error: {error.message}</p>}
      {data && <p>Producto agregado con éxito!</p>}


    </div>
  )
}
