package com.reserva.backend_reservas.controller;


import com.reserva.backend_reservas.dto.BookingRequest;
import com.reserva.backend_reservas.entity.Booking;
import com.reserva.backend_reservas.entity.Usuario;
import com.reserva.backend_reservas.service.impl.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
    @RequestMapping("/bookings")
    public class BookingController {

        private final BookingService bookingService;

        public BookingController(BookingService bookingService) {
            this.bookingService = bookingService;
        }

        @GetMapping("/product/{productId}")
        public ResponseEntity<List<LocalDate>> getBookedDates(@PathVariable Long productId) {
            return ResponseEntity.ok(bookingService.getBookedDatesByProductId(productId));
        }

    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody BookingRequest request,
            @AuthenticationPrincipal Usuario user
            ) {
        Booking newBooking = bookingService.createBooking(
                request.getProductId(),
                request.getStartDate(),
                request.getEndDate(),
                user
        );
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<Booking>> getMyBookings(@AuthenticationPrincipal Usuario user) {
        List<Booking> bookings = bookingService.getBookingsByUser(user);
        return ResponseEntity.ok(bookings);
    }

    }
