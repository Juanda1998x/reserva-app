import { useEffect, useState, useContext } from "react";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../Styles/ProductReservation.css";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

export const ProductReservation = ({ productId }) => {
  const [bookedDates, setBookedDates] = useState([]);
  const { user } = useContext(UserContext);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/bookings/product/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setBookedDates(data.map((d) => new Date(d)));
      })
      .catch(() => {
        setError("No se pudo cargar la disponibilidad. Intenta más tarde.");
      });
  }, [productId]);

  const isDateDisabled = (date) =>
    bookedDates.some((d) => d.toDateString() === date.toDateString());

  const isRangeValid = () => {
    let current = new Date(range[0].startDate);
    while (current <= range[0].endDate) {
      if (isDateDisabled(current)) return false;
      current.setDate(current.getDate() + 1);
    }
    return true;
  };

  const handleReserve = () => {
    if (!user) {
      navigate("/auth/login", {
        state: {
          message: "Debes iniciar sesión para continuar con la reserva. Si no tienes cuenta, regístrate.",
          redirectTo: `/ProductDetail/${productId}`,
        },
      });
      return;
    }

    if (!isRangeValid()) {
      setError("El rango seleccionado contiene fechas no disponibles.");
      return;
    }

    navigate(`/product/${productId}/reservation/detail`, {
      state: {
        productId,
        startDate: format(range[0].startDate, "yyyy-MM-dd"),
        endDate: format(range[0].endDate, "yyyy-MM-dd"),
      },
    });
  };

  return (
    <div className="reservation-box">
      <h2>Reservar este producto</h2>
      <p>Selecciona un rango de fechas disponible:</p>

      {error && <div className="error">{error}</div>}

      {user ? (
        <DateRange
          ranges={range}
          onChange={(item) => setRange([item.selection])}
          minDate={new Date()}
          disabledDates={bookedDates}
          months={2}
          direction="horizontal"
        />
      ) : (
        <p className="info-text">
          Debes iniciar sesión para seleccionar un rango de fechas.
        </p>
      )}

      <button className="reserve-button" onClick={handleReserve}>
        Reservar ahora
      </button>
    </div>
  );
};
