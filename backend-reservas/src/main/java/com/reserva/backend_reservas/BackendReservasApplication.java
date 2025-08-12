package com.reserva.backend_reservas;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendReservasApplication {

	public static void main(String[] args) {
		// Carga el archivo .env
		Dotenv dotenv = Dotenv.load();

		// Pasar las variables al sistema para que Spring pueda leerlas
		System.setProperty("MAIL_PASSWORD", dotenv.get("MAIL_PASSWORD"));
		System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET"));

		SpringApplication.run(BackendReservasApplication.class, args);
	}
}
