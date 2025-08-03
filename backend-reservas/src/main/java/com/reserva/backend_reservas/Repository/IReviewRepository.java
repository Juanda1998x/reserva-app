package com.reserva.backend_reservas.Repository;

import com.reserva.backend_reservas.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IReviewRepository extends JpaRepository<Review , Long > {
    List<Review> findByProductId(Long productId);
    boolean existsByProductIdAndUserEmail(Long productId, String email);
}
