package com.reserva.backend_reservas.Repository;

import com.reserva.backend_reservas.entity.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IImagenRepository extends JpaRepository<Imagen,Long> {
}
