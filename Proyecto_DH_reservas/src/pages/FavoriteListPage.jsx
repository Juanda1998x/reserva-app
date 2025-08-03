import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/FavoriteListPage.css"

export const FavoriteList = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchFavorites = async () => {
        try {
            const response = await fetch("http://localhost:8080/favorites", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) throw new Error("No se pudieron cargar los favoritos");

            const data = await response.json();
            setFavorites(data);
        } catch (error) {
            console.error("Error al cargar favoritos:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (productId) => {
        try {
            await fetch(`http://localhost:8080/favorites/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setFavorites((prev) => prev.filter((prod) => prod.id !== productId));
        } catch (error) {
            console.error("Error al eliminar de favoritos:", error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    if (loading) return <p className="favoritos-loading">Cargando favoritos...</p>;
    if (favorites.length === 0)
        return (
            <div className="favoritos-container">
                <div className="favoritos-header">
                    <h2>No tienes productos favoritos.</h2>
                    <button className="volver-btn" onClick={() => navigate(-1)}>X</button>

                </div>

            </div>
        );

    return (
        <div className="favoritos-container">
            <div className="favoritos-header">
                <h2>Mis productos favoritos</h2>
                <button className="volver-btn" onClick={() => navigate(-1)}>X</button>
            </div>
            <div className="favoritos-grid">
                {favorites.map((product) => (
                    <div key={product.id} className="favorito-card">
                        {product.images && product.images.length > 0 && (
                            <img src={product.images[0]} alt={product.name} />
                        )}
                        <div className="favorito-info">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <button onClick={() => removeFavorite(product.id)} className="quitar-btn">
                                Quitar de favoritos
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

