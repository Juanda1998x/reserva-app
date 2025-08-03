package com.reserva.backend_reservas.service;

import com.reserva.backend_reservas.dto.ReviewDto;

import java.util.List;

public interface IReviewService {
    List<ReviewDto> getReviewsByProduct(Long productId);

    void submitReview(Long productId, String email, int rating, String comment);
}
