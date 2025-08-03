import { useState } from "react";
import { FaFacebookF, FaTwitter, FaLink, FaShareAlt, FaTimes } from "react-icons/fa";
import "../Styles/ShareProduct.css"; 

export const ShareProduct = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const shareUrl = `${window.location.origin}/ProductDetail/${product.id}`;
  const shareText = `${message} ${shareUrl}`;

  const openWindow = (url) => {
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    openWindow(fbUrl);
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    openWindow(twitterUrl);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("¡Enlace copiado al portapapeles!");
  };

  return (
    <div className="share-container">
      <button className="share-button" onClick={() => setIsOpen(true)}>
        <FaShareAlt className="icon" size= {24}/>
      </button>

      {isOpen && (
        <div className="share-modal">
          <div className="share-content">
            <button className="close-button" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>

            <h2>Compartir producto</h2>
            {product.images && product.images.length > 0 && (
              <img src={product.images[0]} alt={product.name} className="product-image" />
            )}
            <p>{product.description}</p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Agrega un mensaje personalizado..."
            />

            <div className="share-buttons">
              <button onClick={handleFacebookShare}>
                <FaFacebookF className="icon" /> Facebook
              </button>
              <button onClick={handleTwitterShare}>
                <FaTwitter className="icon" /> Twitter
              </button>
              <button onClick={handleCopyLink}>
                <FaLink className="icon" /> Copiar enlace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
