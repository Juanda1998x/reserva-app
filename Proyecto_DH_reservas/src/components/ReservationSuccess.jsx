import { useNavigate } from "react-router-dom";
import "../styles/ReservationSuccess.css";

export const ReservationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="reservation-success-container">
      <div className="success-card">
        <h2>¡Reserva exitosa!</h2>
        <p>Tu reserva se ha confirmado correctamente. Revisa tu correo para más detalles.</p>
        <button onClick={() => navigate("/")} className="return-button">
          Volver al inicio
        </button>
      </div>
    </div>
  );
};
