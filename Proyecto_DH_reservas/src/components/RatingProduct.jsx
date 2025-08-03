import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import '../Styles/RatingProduct.css';

export const RatingProduct = ({ average = 0, count = 0, size = 16 }) => {
  const fullStars = Math.floor(average);
  const hasHalfStar = average % 1 >= 0.5;
  const emptyStars = 1 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="rating-container">
      {Array.from({ length: fullStars }).map((_, i) => (
        <FaStar key={`full-${i}`} size={size} className="star-icon filled" />
      ))}

      {hasHalfStar && <FaStarHalfAlt size={size} className="star-icon half" />}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <FaRegStar key={`empty-${i}`} size={size} className="star-icon empty" />
      ))}

      <span className="rating-text">
        {average.toFixed(1)} ({count} valoraciones)
      </span>
    </div>
  );
};
