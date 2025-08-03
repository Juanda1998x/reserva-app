import { useEffect } from "react";
import { useFetch } from "../Hoocks/UseFetch";
import '../styles/ProductByCategory.css';


export const ProductByCategory = ({ categoryId }) => {

  const { data, isLoading, error, fetchData: fetchProductCategory } = useFetch();
  const url = `http://localhost:8080/product/category/${categoryId}`;

  useEffect(() => {
    if (!categoryId) return;
    fetchProductCategory(url, 'GET');
  }, [categoryId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data || data.length === 0) {
    return <div>no hay productos en esta categoria</div>;
  }
  return (
    <div className="product-by-category">
      {data?.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          {/*
          {product.imagenes && product.imagenes.length > 0 && (
            <img src={product.imagenes[0]} alt={product.name} />
          )} */}
          <p>{product.description}</p>
          <p>Precio: ${product.price}</p>
        </div>
      ))}


    </div>
  )
}
