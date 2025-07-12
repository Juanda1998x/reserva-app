package com.reserva.backend_reservas.authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request){
        try {
             AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("error interno" + e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody  AuthRequest request){
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        }catch (IllegalArgumentException e){
            /* aca manejamos el error para poder capturarlo al front y mostrarle al usuario*/
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // aca en caso de que ocurra algun otro error que no estemos manejando
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("credenciales invalidas");
        }
    }
}
