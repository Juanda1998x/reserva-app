import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/ProductAvailabilityCalendar.css"; 

export const ProductAvailabilityCalendar = ({ productId }) => {
  const [bookedDates, setBookedDates] = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        setError(false);
        const res = await fetch(`http://localhost:8080/bookings/product/${productId}`);
        if (!res.ok) throw new Error("No se pudo obtener disponibilidad");
        const data = await res.json();
        const parsedDates = data.map((d) => new Date(d));
        setBookedDates(parsedDates);
      } catch (err) {
        setError(true);
      }
    };

    fetchBookedDates();
  }, [productId, reload]);

  const isDateBooked = (date) => {
    return bookedDates.some((booked) =>
      date.toDateString() === booked.toDateString()
    );
  };

  return (
    <div className="calendar-container">
      <h3>Disponibilidad</h3>

      {error ? (
        <div className="calendar-error">
          <p>No se pudo cargar la disponibilidad. Intenta más tarde.</p>
          <button onClick={() => setReload(!reload)}>Reintentar</button>
        </div>
      ) : (
        <DatePicker
          inline
          monthsShown={2}
          highlightDates={[
            {
              "react-datepicker__day--booked": bookedDates,
            },
          ]}
          dayClassName={(date) =>
            isDateBooked(date) ? "booked-day" : undefined
          }
          filterDate={(date) => !isDateBooked(date)}
          disabledKeyboardNavigation
        />
      )}
    </div>
  );
};
