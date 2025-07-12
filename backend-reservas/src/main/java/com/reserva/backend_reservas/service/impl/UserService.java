package com.reserva.backend_reservas.service.impl;

import com.reserva.backend_reservas.Repository.IUsuarioRepository;
import com.reserva.backend_reservas.entity.Role;
import com.reserva.backend_reservas.entity.Usuario;
import com.reserva.backend_reservas.exception.ResourceNotFoundException;
import com.reserva.backend_reservas.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final IUsuarioRepository userRepository;
    @Override
    public ResponseEntity<?> cambiarRole(Long id, Role newRole) throws ResourceNotFoundException{
        Optional<Usuario> usuario = userRepository.findById(id);
        if (usuario.isPresent()){
            Usuario user = usuario.get();
            user.setRole(newRole);
            userRepository.save(user);

        }else {
            throw new ResourceNotFoundException("no se pudo cambiar el role");
        }
        return ResponseEntity.ok("cambio de rol exitoso");
    }
}
