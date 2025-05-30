import { useNavigate, useParams } from "react-router-dom";
import '../Styles/ProductDetailPage.css';
import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";


export const ProductDetailPage = () => {

    const navigate = useNavigate();
    const { id } = useParams()

    const { randomProducts, isLoading, error } = useContext(ProductContext)
    const product = randomProducts.find((product) => product.id === parseInt(id))



    return (
        <div className="product-detail-container">
            {isLoading ? <h4>cargando...</h4>
                : error ? <h4>error: {error.message}</h4>
                    :
                    product ? (
                        <div key={product.id} className="Product-card">

                            <header className="product-header">
                                <h1
                                    className="product-title"
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

                            </div>
                            :

                        </div>

                    )
                    : <h4>Producto no encontrado</h4>
            }
        </div>
    )
}
