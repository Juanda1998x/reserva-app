package com.reserva.backend_reservas.service;

import com.reserva.backend_reservas.dto.ProductDto;
import com.reserva.backend_reservas.entity.Product;

import java.util.List;

public interface IFavoriteService {
    List<ProductDto> getFavorites(String email);
    void toggleFavorite(String email, Long productId);
    boolean isProductFavorite(String email, Long productId);

    void removeFavorite(Long productId, String username);
}
