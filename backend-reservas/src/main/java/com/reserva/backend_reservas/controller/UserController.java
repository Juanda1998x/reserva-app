package com.reserva.backend_reservas.controller;

import com.reserva.backend_reservas.Repository.IUsuarioRepository;
import com.reserva.backend_reservas.entity.Role;
import com.reserva.backend_reservas.entity.Usuario;
import com.reserva.backend_reservas.exception.ResourceNotFoundException;
import com.reserva.backend_reservas.service.impl.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class UserController {

    private final UserService userService;
    private final IUsuarioRepository userRepository;

    @PutMapping("/{id}/cambiar-role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> cambiarRole(
            @PathVariable Long id,
            @RequestParam Role nuevoRole) throws ResourceNotFoundException {

       return userService.cambiarRole(id, nuevoRole);

    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Usuario> listarUsuario(){
        return userRepository.findAll();
    }


}
