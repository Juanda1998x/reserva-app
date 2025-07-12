import { use, useEffect, useState } from 'react'
import { useFetch } from '../Hoocks/UseFetch';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/EditProductPage.css'

export const EditProductPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('');

  const urlProduct = `http://localhost:8080/product/${id}`;

  const { data: product, isLoading, error, fetchData: fetchProduct } = useFetch();

  useEffect(() => {
    console.log("Fetching product with ID:", id);
    console.log("url:", urlProduct);
    console
    fetchProduct(urlProduct, 'GET');
  }, [id]);

  const urlCategories = 'http://localhost:8080/category/get';

  const { data: categories, fetchData: fetchCategories } = useFetch();
  useEffect(() => {
    fetchCategories(urlCategories, 'GET');
  }, [urlCategories]);

  const { fetchData: updatedProduct } = useFetch();

  
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!product || !selectedCategory) return alert('Por favor, completa todos los campos');

    const categoryId= Number(selectedCategory);
    if (isNaN(categoryId)) {
      return alert('Por favor, selecciona una categoría válida');
    }
    const urlUpdateProduct = `http://localhost:8080/product/${id}/category?categoryId=${categoryId}`;
    try {
      await updatedProduct(urlUpdateProduct,
        'PUT'
      )
      alert('Producto actualizado correctamente');
      navigate('/admin');
      await fetchProduct(urlProduct, 'GET'); // Recargar el producto actualizado
      await fetchCategories(urlCategories, 'GET'); // Recargar las categorías actualizadas
    } catch (error) {
     
      alert('Error al actualizar el producto. Por favor, inténtalo de nuevo más tarde.');
    }
  }


  return (

    <div className="edit-product-container">
      <h2>Editar Producto</h2>

      {isLoading && <h4>Cargando producto...</h4>}
      {error && <h4>Error: {error.message}</h4>}
      {!isLoading && product && (
        <>
          <p><strong>Producto: </strong>{product.name}</p>

          <label htmlFor="category">Seleccionar categoria</label>

          <select
            value={selectedCategory}
            id="category"
            onChange={(e) => setSelectedCategory(e.target.value)}
            required 
          >
            <option value="">-- Selecciona una categoria --</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}

          </select>
          <button onClick={handleUpdateProduct}>Actualizar</button>


        </>
      )}



    </div>
  )
}
