package com.reserva.backend_reservas.service.impl;

import com.reserva.backend_reservas.Repository.IFavoriteRepository;
import com.reserva.backend_reservas.Repository.IProductRepository;
import com.reserva.backend_reservas.Repository.IUsuarioRepository;
import com.reserva.backend_reservas.dto.ProductDto;
import com.reserva.backend_reservas.entity.Favorite;
import com.reserva.backend_reservas.entity.Product;
import com.reserva.backend_reservas.entity.Review;
import com.reserva.backend_reservas.entity.Usuario;
import com.reserva.backend_reservas.service.IFavoriteService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class FavoriteService implements IFavoriteService {

    @Autowired
    IFavoriteRepository favoriteRepository;
    @Autowired
    IUsuarioRepository usuarioRepository;
    @Autowired
    IProductRepository productRepository;

    @Override
    public List<ProductDto> getFavorites(String email) {
        return favoriteRepository.findAllByUserEmail(email).stream()
                .map(Favorite::getProduct)
                .map(product -> {
                    // Convertir imágenes a base64
                    List<String> imagenesBase64 = product.getImagenes().stream()
                            .map(imagen -> {
                                String base64 = Base64.getEncoder().encodeToString(imagen.getDatos());
                                return "data:" + imagen.getTipo() + ";base64," + base64;
                            })
                            .collect(Collectors.toList());

                    // Calcular promedio y cantidad de reseñas
                    List<Review> reviews = product.getReviews();
                    double averageRating = 0.0;
                    int reviewCount = 0;

                    if (reviews != null && !reviews.isEmpty()) {
                        reviewCount = reviews.size();
                        averageRating = reviews.stream()
                                .mapToInt(Review::getRating)
                                .average()
                                .orElse(0.0);
                    }

                    // Construir el DTO
                    return new ProductDto(
                            product.getId(),
                            product.getName(),
                            product.getDescription(),
                            imagenesBase64,
                            product.getCategory(),
                            product.getCharacteristics(),
                            averageRating,
                            reviewCount,
                            product.getWhatsappNumber(),
                            product.getCity(),
                            product.getPrice()
                    );
                })
                .collect(Collectors.toList());
    }


    @Override
    public void toggleFavorite(String email, Long productId) {
        Optional<Favorite> existing = favoriteRepository.findByUserEmailAndProductId(email, productId);

        if (existing.isPresent()) {
            favoriteRepository.delete(existing.get());
        } else {
            Usuario user = usuarioRepository.findByEmail(email).orElseThrow();
            Product product = productRepository.findById(productId).orElseThrow();
            Favorite favorite = new Favorite();
            favorite.setUser(user);
            favorite.setProduct(product);
            favoriteRepository.save(favorite);
        }
    }

    @Override
    public boolean isProductFavorite(String email, Long productId) {
        return favoriteRepository.existsByUserEmailAndProductId(email, productId);
    }

    @Override
    public void removeFavorite(Long productId, String username) {
        Usuario user = usuarioRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));

        Favorite favorite = favoriteRepository.findByUserAndProduct(user, product)
                .orElseThrow(() -> new EntityNotFoundException("Este producto no está en favoritos"));

        favoriteRepository.delete(favorite);
    }
}
