import { useNavigate, useParams } from "react-router-dom";
import '../Styles/ProductDetailPage.css';
import { useEffect } from "react";
import { useFetch } from "../Hoocks/UseFetch";
import { getFaIconComponent } from "../Utils/getFaIcon";
import { ProductAvailabilityCalendar } from "../components/ProductAvailabilityCalendar";
import { ProductReservation } from "../components/ProductReservation";
import { ProductPolicies } from "../components/ProductPolicies";
import { ReviewProduct } from "../components/ReviewProduct";
import { RatingProduct } from "../components/RatingProduct";
import WhatsappButton from "../components/WhatsappButton";


export const ProductDetailPage = () => {

    const navigate = useNavigate();
    const { id } = useParams()
    const url = `http://localhost:8080/product/${id}`

    const { data: product, isLoading, error, fetchData: fetchProduct } = useFetch();
    useEffect(() => {
        fetchProduct(url, 'GET')
    }, [])

    const defaultPolicies = [
        {
            title: "Normas del lugar",
            description:
                "No se permite fumar ni realizar fiestas. Se espera respeto por los vecinos y las instalaciones durante toda la estancia.",
        },
        {
            title: "Política de cancelación",
            description:
                "Cancelaciones gratuitas hasta 48 horas antes del check-in. Después de ese plazo se aplicará un cargo del 50%.",
        },
        {
            title: "Recomendaciones de uso",
            description:
                "Cuidar adecuadamente el mobiliario, usar los electrodomésticos según las instrucciones y reportar cualquier daño inmediatamente.",
        },
        {
            title: "Horario de entrada y salida",
            description:
                "Check-in a partir de las 3:00 PM. Check-out antes de las 11:00 AM. Consultar por disponibilidad para extensiones.",
        },
        {
            title: "Limpieza y mantenimiento",
            description:
                "Se realiza limpieza general antes del ingreso. En estancias largas se recomienda limpieza semanal a cargo del huésped.",
        },
    ];


    const productPolicies = product?.policies ?? defaultPolicies;

    return (
        <div className="product-detail-container">
            {isLoading ? <h4>cargando...</h4>
                : error ? <h4>error: {error.message}</h4>
                    :
                    product ? (
                        <div key={product.id} className="Product-card">
                            <RatingProduct average={product.averageRating} count={product.reviewCount} size={20} />
                            <header className="product-header1">
                                <h1
                                    className="product-title1"
                                >
                                    {product.name}
                                </h1>

                                <button
                                    className="back-button"
                                    onClick={() => navigate("/")}
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
                                <ProductPolicies policies={productPolicies} />

                                <div>
                                    <ProductAvailabilityCalendar productId={product.id} />

                                </div>

                                <div>
                                    <ProductReservation productId={product.id} />
                                </div>
                                <div>
                                    <ReviewProduct productId={product.id} token={localStorage.getItem('token')} />
                                </div>
                                <WhatsappButton
                                    phoneNumber={product.WhatsappNumber}
                                    message={`Hola, estoy interesado en el producto ${product.name}. ¿Podrías darme más información?`}
                                />

                            </div>

                        </div>

                    )
                : <h4>Producto no encontrado</h4>
            }
        </div>
    )
}
