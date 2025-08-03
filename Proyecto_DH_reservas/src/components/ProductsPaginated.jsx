import { useContext, useState } from "react"
import '../Styles/ProductsRandom.css';
import { ProductContext } from "../Context/ProductContext";
import { NavLink } from "react-router-dom";
import { ShareProduct } from "./ShareProduct";
import { FavoriteButton } from "./FavoriteButton";
import { RatingProduct } from "./RatingProduct";

export const ProductsPaginated = () => {

    const {
        paginatedProducts,
        isLoading,
        error

    } = useContext(ProductContext);


    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState([]);

    const handleOpenModal = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImage([]);
    }

    return (

        <div className="grid-container">
            {isLoading ? <h4>cargando...</h4>
                : error ? <h4>error: {error.message}</h4>
                    :
                    paginatedProducts.map((product) => (
                        <div key={product.id} className="Product-card">

                            <div className="product-actions">
                                <ShareProduct product={product} />
                                <FavoriteButton productId={product.id} token={localStorage.getItem('token')} />
                                <RatingProduct average={product.averageRating} count={product.reviewCount} size={20} />
                            </div>

                            <div className="gallery">
                                <div className="main-image">
                                    {product.images && product.images.length > 0 && (
                                        <img src={product.images[0]} alt={product.name} />
                                    )}

                                </div>
                                <div className="grid-images">
                                    {product.images && product.images.slice(1, 5).map((image, index) => (
                                        <img key={index} src={image} alt={`extra-${index}`} />
                                    ))}
                                </div>
                                <button className="ver-mas" onClick={() => handleOpenModal(product.images || [])} >Ver más </button>

                            </div>
                            <div className="product-information">

                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <NavLink to={`/ProductDetail/${product.id}`} className="nav-link" aria-current="page" >Detalles</NavLink>
                            </div>

                        </div>
                    ))}
            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={handleCloseModal}>&times;</span>
                        <div className="modal-images" > {selectedImage.map((image, index) => (
                            <img key={index} src={image} alt={`img-${index}`} />
                        ))}
                        </div>
                    </div>
                </div>
            )}

        </div>

    )
}
