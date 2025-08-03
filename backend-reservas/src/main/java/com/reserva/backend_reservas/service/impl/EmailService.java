package com.reserva.backend_reservas.service.impl;

import com.reserva.backend_reservas.entity.Booking;
import com.reserva.backend_reservas.entity.Product;
import com.reserva.backend_reservas.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBookingConfirmationEmail(Usuario usuario, Product product, Booking booking) {
        String to = usuario.getEmail();
        String subject = "Confirmación de tu reserva";

        String body = """
                Hola %s %s,

                Gracias por tu reserva en nuestra plataforma. Aquí están los detalles:

                🏨 Producto reservado: %s
                📅 Fecha de inicio: %s
                📅 Fecha de fin: %s

                Si tienes preguntas, puedes contactar al proveedor directamente por WhatsApp o en nuestra plataforma.

                ¡Gracias por confiar en nosotros!
                """.formatted(
                usuario.getName(),
                usuario.getLastName(),
                product.getName(),
                booking.getStartDate(),
                booking.getEndDate()
        );

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("juandmb98.jdm@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}

