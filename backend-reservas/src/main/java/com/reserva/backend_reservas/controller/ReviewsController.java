package com.reserva.backend_reservas.controller;

import com.reserva.backend_reservas.dto.ReviewDto;
import com.reserva.backend_reservas.service.IReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reviews")
public class ReviewsController {

    private final IReviewService reviewService;



    @GetMapping("/{productId}")
    public ResponseEntity<List<ReviewDto>> getReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(productId));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<Void> submitReview(
            @PathVariable Long productId,
            @RequestBody ReviewDto reviewDto,
            @AuthenticationPrincipal UserDetails user
    ) {
        reviewService.submitReview(productId, user.getUsername(), reviewDto.getRating(), reviewDto.getComment());
        return ResponseEntity.ok().build();
    }
}
