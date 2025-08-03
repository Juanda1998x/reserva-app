package com.reserva.backend_reservas.Repository;

import com.reserva.backend_reservas.entity.Booking;
import com.reserva.backend_reservas.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IBookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByProductId(Long productId);

    List<Booking> findByUser(Usuario user);
}
