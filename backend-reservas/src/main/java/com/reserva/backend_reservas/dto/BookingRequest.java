package com.reserva.backend_reservas.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookingRequest {

    private Long productId;
    private LocalDate startDate;
    private LocalDate endDate;

}
