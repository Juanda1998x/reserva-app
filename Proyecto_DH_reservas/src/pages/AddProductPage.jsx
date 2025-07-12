import { useEffect, useState } from 'react'
import { useFetch } from '../Hoocks/UseFetch';
import '../Styles/AddProductPage.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

export const AddProductPage = () => {

  const [selectedCategory, setSelectedCategory] = useState('');

  const urlCategories = 'http://localhost:8080/category/get';
  const urlCharacteristics = 'http://localhost:8080/characteristics/all';
  const { data: characteristicData, fetchData: fetchCharacteristics } = useFetch();
  const { data: categories, fetchData: fetchCategories } = useFetch();

  useEffect(() => {
    fetchCharacteristics(urlCharacteristics, 'GET')
    fetchCategories(urlCategories, 'GET');

  }, [urlCategories, urlCharacteristics]);

  const navigate = useNavigate(); // hook para navegar a otras paginas

  const url = 'http://localhost:8080/product/create'; // URL de la API a la que se enviarán los datos del formulario

  // guarda una lista de archivos seleccionados por el usuario
  const [Imagenes, setImagenes] = useState([]);



  const handleCharacteristicChange = (selectedOptions) => {
    setForm({
      ...form,
      characteristics: selectedOptions.map(option => option.value) // guarda los ids de las caracteristicas seleccionadas
    });
  }

  // guarda el estado del formulario
  const [form, setForm] = useState({
    name: '',
    description: '',
    categoryId: '',
    characteristics: []

  });

  const { data, error, fetchData } = useFetch();

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
    formData.append('categoryId', selectedCategory); // agrega la categoria seleccionada al objeto FormData
    formData.append('characteristics', JSON.stringify(form.characteristics));
    // agrega las imagenes seleccionadas al objeto FormData
    Imagenes.forEach((img) => {
      formData.append('images', img);
    });
    
    // llama al hoock perzonalizado para hacer la peticion POST
    fetchData(url, 'POST', formData);
    console.log(data)

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

          <label>Categoria:</label>
          <select
            value={selectedCategory}
            id="category"
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
            className='select-category'
          >
            <option value="" className=''>-- Selecciona una categoria --</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id} className='option-select'>
                {category.name}
              </option>
            ))}

          </select>
          <label>Caracteristicas:</label>
          <Select
            isSearchable={false}
            isMulti
            options={characteristicData?.map((char) => ({
              value: char.id,
              label: char.name
            }

            ))}
            onChange={handleCharacteristicChange}
            className='select-characteristics'
            placeholder="-- Selecciona las características --"
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: 'white',
                borderColor: state.isFocused ? '#007bff' : '#ccc',
                boxShadow: state.isFocused ? '0 0 0 1px #007bff' : 'none',
                height: '40px',
                borderRadius: '5px',
                cursor: 'pointer',

              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#e0e0e0',
                borderRadius: '5px',
                padding: '2px'

              }),
              placeholder: (base) => ({
                ...base,
                color: '#666'
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? '#007bff'
                  : state.isFocused ? 'gray' : 'white',
                color: state.isFocused ? 'white' : 'black',
                padding: '10px 15px',
                cursor: 'pointer',
                borderRadius: '8px'
              }),
            }}
            required
          />

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
