import { Pagination } from '../components/Pagination';
import { ProductsPaginated } from '../components/productsPaginated';
import { ProductsRandom } from '../components/ProductsRandom';

import '../Styles/PaginaPrincipal.CSS';


export const PaginaPrincipal = () => {
  return (
    <div className="container">

      <input type="text" placeholder="Buscar..." className="search" />


      <section className="categories">

        <h2>Categorias</h2>

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
