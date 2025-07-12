import { useNavigate, useParams } from "react-router-dom";
import '../Styles/ProductDetailPage.css';
import { useEffect } from "react";
import { useFetch } from "../Hoocks/UseFetch";
import { getFaIconComponent } from "../Utils/getFaIcon";


export const ProductDetailPage = () => {

    const navigate = useNavigate();
    const { id } = useParams()
    const url = `http://localhost:8080/product/${id}`

    const { data: product, isLoading, error, fetchData: fetchProduct } = useFetch();
    useEffect(() => {
        fetchProduct(url, 'GET')
    }, [])






    return (
        <div className="product-detail-container">
            {isLoading ? <h4>cargando...</h4>
                : error ? <h4>error: {error.message}</h4>
                    :
                    product ? (
                        <div key={product.id} className="Product-card">

                            <header className="product-header1">
                                <h1
                                    className="product-title1"
                                >
                                    {product.name}
                                </h1>

                                <button
                                    className="back-button"
                                    onClick={() => navigate(-1)}
                                >
                                    Volver
                                </button>



                            </header>

                            <div
                                className="product-body"
                            >
                                <p
                                    className="product-description"
                                >
                                    {product.description}

                                </p>

                                <div
                                    className="product-gallery"
                                >
                                    {product.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`product-image-${index}`}
                                            className="product-image"
                                        />
                                    ))}
                                </div>

                                <div className="container-characteristic">

                                    <h2>Que Ofrecemos</h2>

                                    <ul className="product-characteristcs">
                                        {product.characteristics?.map(char => {
                                            const Icon = getFaIconComponent(char.icon);
                                            return (
                                                <li key={char.id} className="list-charactreristics">
                                                    <i>{Icon ? <Icon size={20} color="green" /> : 'sin icono'}</i>
                                                    <span>{char.name}</span>
                                                </li>
                                            );
                                        })}

                                    </ul>
                                </div>

                            </div>


                        </div>


                    )
                        : <h4>Producto no encontrado</h4>
            }
        </div>
    )
}
