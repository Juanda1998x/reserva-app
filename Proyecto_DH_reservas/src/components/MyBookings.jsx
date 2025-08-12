import { useEffect, useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import "../Styles/MyBookings.css";

export const MyBookings = () => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch("http://localhost:8080/bookings/my-bookings", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error("Error al obtener reservas:", err));
  }, [user]);

  return (
    <div className="my-bookings-container">
      <h2>Mis reservas</h2>
      {bookings.length === 0 ? (
        <p>No tienes reservas aún.</p>
      ) : (
        bookings?.map((booking) => (
          <div key={booking.id} className="booking-card">
            <p><strong>Producto:</strong> {booking.product.name}</p>
            <p><strong>Desde:</strong> {booking.startDate}</p>
            <p><strong>Hasta:</strong> {booking.endDate}</p>
          </div>
        ))
      )}
    </div>
  );
};
