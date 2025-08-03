import { useEffect, useState } from "react";
import { useFetch } from "../Hoocks/UseFetch";
import '../Styles/AddCategoryPage.css';

export const AddCategoryPage = () => {
  const { fetchData: fetchCategoryCreate, error, data } = useFetch();
  const { fetchData: fetchCategories, data: categories } = useFetch();
  const { fetchData: deleteCategory } = useFetch();

  const [form, setForm] = useState({
    name: '',
    imageUrl: '',
    description: ''
  });

  useEffect(() => {
    fetchCategories("http://localhost:8080/category/get");
  }, [data]); // actualiza lista cuando se cree una nueva categoría

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCategoryCreate("http://localhost:8080/category/create", "POST", JSON.stringify(form));
  };

  const handleDelete = (id, name) => {
    const confirmed = window.confirm(`¿Estás seguro de eliminar la categoría "${name}"? Esto también podría afectar productos asociados.`);
    if (confirmed) {
      deleteCategory(`http://localhost:8080/category/delete/${id}`, "DELETE").then(() => {
        fetchCategories("http://localhost:8080/category/get"); // actualizar listado
      });
    }
  };

  return (
    <div className="create-category-container">
      <h1>Crear Categoría</h1>
      <form className="form-category" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="imageUrl">URL de la imagen:</label>
          <input type="text" id="imageUrl" name="imageUrl" value={form.imageUrl} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea id="description" name="description" value={form.description} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Crear Categoría</button>
        {error && <p className="error-message">Error: {error.message}</p>}
        {data && <p className="success-message">Categoría creada exitosamente</p>}
      </form>

      <h2>Categorías existentes</h2>
      <div className="category-list">
        {categories && categories.map((cat) => (
          <div key={cat.id} className="category-item">
            <p><strong>{cat.name}</strong></p>
            <img src={cat.imageUrl} alt={cat.name} width={100} />
            <p>{cat.description}</p>
            <button className="delete-button" onClick={() => handleDelete(cat.id, cat.name)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};
