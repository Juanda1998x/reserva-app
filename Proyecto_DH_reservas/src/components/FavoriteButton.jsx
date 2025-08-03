import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../Styles/FavoriteButton.css"; 

export const FavoriteButton = ({ productId, token }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8080/favorites/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsFavorite(data.favorite); 
        })
        .catch((err) => console.error("Error obteniendo favorito:", err));
    }
  }, [productId, token]);

  const handleToggleFavorite = () => {
    if (!token) {
      alert("Debes iniciar sesión para marcar favoritos.");
      return;
    }

    const method = isFavorite ? "DELETE" : "POST";

    fetch(`http://localhost:8080/favorites/${productId}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cambiar favorito");
        setIsFavorite(!isFavorite);
      })
      .catch((err) => console.error(err));
  };

  return (
    <button
      className="favorite-button"
      onClick={handleToggleFavorite}
      aria-label="Marcar como favorito"
    >
      {isFavorite ? (
        <FaHeart className="icon-favorite"color="#FF5A5F" size={24} />
      ) : (
        <FaRegHeart color="#555" size={24} />
      )}
    </button>
  );
}


