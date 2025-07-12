package com.reserva.backend_reservas.authentication;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String name;
    private String lastName;
    private String email;
    private String token;
}
