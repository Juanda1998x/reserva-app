package com.reserva.backend_reservas.authentication;

import com.reserva.backend_reservas.Repository.IUsuarioRepository;
import com.reserva.backend_reservas.configuration.JwtService;
import com.reserva.backend_reservas.entity.Role;
import com.reserva.backend_reservas.entity.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final IUsuarioRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("el correo ya esta registrado");
        }
        var user = Usuario.builder()
                .name(request.getName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .age(request.getAge())
                .conditions(request.isConditions())
                .role(Role.USER)
                .build();

        userRepository.save(user);

        var jwt = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwt)
                .name(user.getLastName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("email no existe"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("contraseña incorrecta");
        }

        var jwt = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwt)
                .name(user.getName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();

    }
}
