import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import "../Styles/ReservationDetailPage.css";

export const ReservationDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { productId, startDate, endDate } = location.state || {};

    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Validar que haya datos necesarios
    useEffect(() => {
        if (!productId || !startDate || !endDate || !user) {
            navigate("/");
        }
    }, [productId, startDate, endDate, user, navigate]);

    // Obtener producto
    useEffect(() => {
        if (productId) {
            fetch(`http://localhost:8080/product/${productId}`)
                .then(res => {
                    if (!res.ok) throw new Error("Error al obtener el producto");
                    return res.json();
                })
                .then(data => setProduct(data))
                .catch(() => {
                    setError("No se pudo cargar la información del producto.");
                });
        }
    }, [productId]);

    const handleConfirm = () => {
        fetch("http://localhost:8080/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                productId,
                startDate,
                endDate,
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error al reservar");
                // No hacemos res.json() porque no hay respuesta en el body
                setSuccess(true);
                navigate("/reservation/success");
            })
            .catch(() => {
                setError("No se pudo completar la reserva. Inténtalo más tarde.");
                setSuccess(false);
            });
    };
    return (
        <div className="reservation-detail-box">
            <h2>Confirmar Reserva</h2>

            {error && <div className="error">{error}</div>}
            {success && <div className="success">¡Reserva confirmada!</div>}

            {product ? (
                <>
                    <div className="product-info">
                        <h3>Producto</h3>
                        <p><strong>Nombre:</strong> {product.name}</p>
                        <p><strong>Ubicación:</strong> {product.city}, {product.country}</p>
                        <p><strong>Descripción:</strong> {product.description}</p>
                        {product.images && product.images.length > 0 && (
                            <img src={product.images[0]}
                                alt={product.name}
                                style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "10px" }} />
                        )}

                    </div>

                    <div className="user-info">
                        <h3>Tus datos</h3>
                        <p><strong>Nombre:</strong> {user.name} {user.lastName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>

                    <div className="dates-info">
                        <h3>Fechas seleccionadas</h3>
                        <p><strong>Desde:</strong> {startDate}</p>
                        <p><strong>Hasta:</strong> {endDate}</p>
                    </div>

                    <button className="confirm-button" onClick={handleConfirm}>
                        Confirmar reserva
                    </button>
                </>
            ) : (
                <p>Cargando información del producto...</p>
            )}
        </div>
    );
};
