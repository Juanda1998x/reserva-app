package com.reserva.backend_reservas.service.impl;
import com.reserva.backend_reservas.Repository.IProductRepository;
import com.reserva.backend_reservas.Repository.IReviewRepository;
import com.reserva.backend_reservas.Repository.IUsuarioRepository;
import com.reserva.backend_reservas.dto.ReviewDto;
import com.reserva.backend_reservas.entity.Review;
import com.reserva.backend_reservas.service.IReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {

    private final IReviewRepository reviewRepository;
    private final IProductRepository productRepository;
    private final IUsuarioRepository userRepository;

    @Override
    public List<ReviewDto> getReviewsByProduct(Long productId) {
        return reviewRepository.findByProductId(productId).stream()
                .map(r -> new ReviewDto(r.getRating(), r.getComment(), r.getDate(), r.getUser().getName()))
                .toList();
    }

    @Override
    public void submitReview(Long productId, String email, int rating, String comment) {
        if (!reviewRepository.existsByProductIdAndUserEmail(productId, email)) {
            Review review = new Review();
            review.setProduct(productRepository.findById(productId).orElseThrow());
            review.setUser(userRepository.findByEmail(email).orElseThrow());
            review.setRating(rating);
            review.setComment(comment);
            review.setDate(LocalDate.now());
            reviewRepository.save(review);
        } else {
            throw new IllegalStateException("Usuario ya calificó este producto");
        }
    }
}
