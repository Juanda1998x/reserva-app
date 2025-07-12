import { useState } from 'react';
import { CategorySection } from '../components/CategorySection';
import { Pagination } from '../components/Pagination';
import { ProductsPaginated } from '../components/productsPaginated';
import { ProductsRandom } from '../components/ProductsRandom';

import '../Styles/PaginaPrincipal.CSS';
import { ProductByCategory } from './ProductByCategory';


export const PaginaPrincipal = () => {
  const [categoryId, setCategoryId] = useState(null);
  return (
    <div className="container">

      <input type="text" placeholder="Buscar..." className="search" />


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
