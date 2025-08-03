import React, { useEffect, useState } from "react";
import "../Styles/ReviewProduct.css";
const StarRating = ({ rating, onRatingChange }) => (
    <div>
        {[...Array(5)].map((_, i) => (
            <span
                key={i}
                onClick={() => onRatingChange && onRatingChange(i + 1)}
                style={{ fontSize: "25px", cursor: "pointer", color: i < rating ? "#facc15" : "#e5e7eb" }}>
                ★
            </span>
        ))}
    </div>
);

export const ReviewProduct = ({ productId, token }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/reviews/${productId}`)
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [productId]);

    const handleSubmitReview = async () => {
        await fetch(`http://localhost:8080/reviews/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ rating, comment }),
        });
        setRating(0);
        setComment("");
        const updated = await fetch(`http://localhost:8080/reviews/${productId}`).then(res => res.json());
        setReviews(updated);
    };

    return (
        <div className="review-container">
            <div className="review-form">
                <h4>Deja tu reseña</h4>
                <StarRating rating={rating} onRatingChange={setRating} />
                <textarea value={comment} onChange={e => setComment(e.target.value)} />
                <button onClick={handleSubmitReview}>Enviar</button>
            </div>
            <h3>Reseñas de clientes</h3>
            {reviews.map((r, i) => (
                <div key={i} className="review">
                    <StarRating rating={r.rating} />
                    <p>
                        <strong>{r.userName}</strong> — {new Date(r.date).toLocaleDateString("es-CO", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                    </p>

                    <p>{r.comment}</p>
                </div>
            ))}


        </div>
    );
};

