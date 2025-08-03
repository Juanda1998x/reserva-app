package com.reserva.backend_reservas.Repository;

import com.reserva.backend_reservas.entity.Favorite;
import com.reserva.backend_reservas.entity.Product;
import com.reserva.backend_reservas.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IFavoriteRepository extends JpaRepository<Favorite, Long> {

    boolean existsByUserEmailAndProductId(String email, Long productId);

    Optional<Favorite> findByUserEmailAndProductId(String email, Long productId);

    List<Favorite> findAllByUserEmail(String email);
    Optional<Favorite> findByUserAndProduct(Usuario user, Product product);
}

