package com.reserva.backend_reservas.Repository;

import com.reserva.backend_reservas.entity.Characteristics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICharacteristicsRepository extends JpaRepository<Characteristics,Long> {
    boolean existsByNameIgnoreCase(String name);
}
