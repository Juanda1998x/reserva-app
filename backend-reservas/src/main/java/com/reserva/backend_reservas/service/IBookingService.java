package com.reserva.backend_reservas.service;

import com.reserva.backend_reservas.entity.Booking;
import com.reserva.backend_reservas.entity.Usuario;

import java.time.LocalDate;
import java.util.List;

public interface IBookingService {
    List<LocalDate> getBookedDatesByProductId(Long productId);
    Booking createBooking(Long productId, LocalDate startDate, LocalDate endDate, Usuario user);

    List<Booking> getBookingsByUser(Usuario user);
}
