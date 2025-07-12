package com.reserva.backend_reservas.service;

import com.reserva.backend_reservas.entity.Role;
import com.reserva.backend_reservas.exception.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;

public interface IUserService {
    ResponseEntity<?> cambiarRole(Long id, Role newRole) throws ResourceNotFoundException;
}
