import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/WhatsappButton.css"; 


const WhatsappButton = ({ phoneNumber, message }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    try {
      window.open(whatsappUrl, "_blank");
      alert("Redireccionando a WhatsApp...");
    } catch (error) {
      alert("Error al abrir WhatsApp. Verifica tu conexión o número.");
    }
  };

  return (
    <button className="whatsapp-button" onClick={handleClick} title="Contactar por WhatsApp">
      <FaWhatsapp className="whatsapp-icon" />
    </button>
  );
};

export default WhatsappButton;
