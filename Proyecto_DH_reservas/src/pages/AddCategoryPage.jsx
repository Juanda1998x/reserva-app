import { useState } from "react";
import { useFetch } from "../Hoocks/UseFetch";
import '../Styles/AddCategoryPage.css';


export const AddCategoryPage = () => {

    const { fetchData:fetchCategoryCreate, error, data } = useFetch();
    const [form, setForm] = useState({
        name: '',
        imageUrl: '',
        description: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchCategoryCreate('http://localhost:8080/category/create', 'POST', JSON.stringify(form))
    };
  return (
    <div className="create-category-container">

        <h1>Crear Categoria</h1>
        <form className="form-category" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="imageUrl">URL de la imagen:</label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            <button type="submit">Crear Categoria</button>
            {error && <p className="error-message">Error: {error.message}</p>}
            {data && <p className="success-message">Categoria creada exitosamente</p>}
        </form>
    </div>
  )
}
