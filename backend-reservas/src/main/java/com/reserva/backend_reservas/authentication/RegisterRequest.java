package com.reserva.backend_reservas.authentication;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RegisterRequest {
    private String name;
    private String lastName;
    private String email;
    private String password;
    private int age;
    private boolean conditions;
}
