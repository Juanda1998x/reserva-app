package com.reserva.backend_reservas.Repository;

import com.reserva.backend_reservas.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category,Long>{
    boolean existsByNameIgnoreCase(String name);
}
