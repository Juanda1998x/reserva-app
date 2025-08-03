package com.reserva.backend_reservas.service.impl;

import com.reserva.backend_reservas.Repository.IBookingRepository;
import com.reserva.backend_reservas.Repository.IProductRepository;
import com.reserva.backend_reservas.entity.Booking;
import com.reserva.backend_reservas.entity.Product;
import com.reserva.backend_reservas.entity.Usuario;
import com.reserva.backend_reservas.service.IBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService {

    @Autowired
    IBookingRepository bookingRepository;
    @Autowired
    EmailService emailService;
    @Autowired
    IProductRepository productRepository;
    @Override
    public List<LocalDate> getBookedDatesByProductId(Long productId) {
        List<Booking> bookings = bookingRepository.findByProductId(productId);
        List<LocalDate> dates = new ArrayList<>();

        for (Booking b : bookings) {
            LocalDate current = b.getStartDate();
            while (!current.isAfter(b.getEndDate())) {
                dates.add(current);
                current = current.plusDays(1);
            }
        }

        return dates;
    }
    @Override
    public Booking createBooking(Long productId, LocalDate startDate, LocalDate endDate, Usuario user) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        Booking booking = new Booking();
        booking.setProduct(product);
        booking.setStartDate(startDate);
        booking.setEndDate(endDate);
        booking.setUser(user);
        Booking saved = bookingRepository.save(booking);

        emailService.sendBookingConfirmationEmail(user, product, saved);

        return saved;
    }

    @Override
    public List<Booking> getBookingsByUser(Usuario user) {
        return bookingRepository.findByUser(user);
    }

}
