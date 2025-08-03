package com.reserva.backend_reservas.controller;

import com.reserva.backend_reservas.dto.ProductDto;
import com.reserva.backend_reservas.entity.Product;
import com.reserva.backend_reservas.service.impl.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/favorites")

public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("/{productId}")
    public ResponseEntity<Map<String, Boolean>> isFavorite(
            @PathVariable Long productId,
            @AuthenticationPrincipal UserDetails userDetails) {
        boolean fav = favoriteService.isProductFavorite(userDetails.getUsername(), productId);
        return ResponseEntity.ok(Map.of("favorite", fav));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<Void> toggleFavorite(
            @PathVariable Long productId,
            @AuthenticationPrincipal UserDetails userDetails) {
        favoriteService.toggleFavorite(userDetails.getUsername(), productId);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{productId}")
    public ResponseEntity<String> removeFavorite(
            @PathVariable Long productId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        favoriteService.removeFavorite(productId, userDetails.getUsername());
        return ResponseEntity.ok("Producto eliminado de favoritos");
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> listFavorites(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(favoriteService.getFavorites(userDetails.getUsername()));
    }
}
