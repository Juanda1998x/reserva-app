import { useState } from 'react';
import { CategorySection } from '../components/CategorySection';
import { Pagination } from '../components/Pagination';
import { ProductsPaginated } from '../components/productsPaginated';
import { ProductsRandom } from '../components/ProductsRandom';

import '../Styles/PaginaPrincipal.CSS';
import { ProductByCategory } from './ProductByCategory';
import { ProductSearch } from '../components/ProductSearch';


export const PaginaPrincipal = () => {
  const [categoryId, setCategoryId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="container">

      <div className="search">
        <ProductSearch
          onResults={setSearchResults}
          onClearCategory={() => setCategoryId(null)}
        />

        {searchResults.length > 0 && (

          <div className="product-search-results">
            <div className='search-header'>
              <h2>Resultados de la búsqueda</h2>
              <button className="btn-delete-filter" onClick={() => setSearchResults([])}>
                X
              </button>
            </div>
            <div className='product-list-search'>
              {searchResults?.map((product) => (
                <div key={product.id} className="product-card-search">
                  <h3>{product.name}</h3>
                  {product.images && product.images.length > 0 && (
                    <img src={product.images[0]} alt={product.name} />
                  )}
                  <p>{product.description}</p>
                  <p>Precio: ${product.price}</p>
                </div>
              ))}

            </div>



          </div>
        )}

      </div>


      <section className="categories">

        <h2>Categorias</h2>
        <CategorySection onSelectedCategory={setCategoryId} />
        <div className="category-products">
          {categoryId && (
            <>
              <button className="btn-delete-filter" onClick={() => setCategoryId(null)}>
                Quitar filtro
              </button>
              <ProductByCategory categoryId={categoryId} />
            </>
          )}
        </div>

      </section>
      <section className="recomendatios">

        <h2>Recomendaciones</h2>
        <ProductsRandom />

      </section>

      <section className='products-paginated'>
        <h2>Todos nuestros productos</h2>
        <ProductsPaginated />
        <Pagination />
      </section>

    </div>
  )
}
