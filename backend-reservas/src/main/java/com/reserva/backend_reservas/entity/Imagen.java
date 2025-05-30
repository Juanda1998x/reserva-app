package com.reserva.backend_reservas.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Imagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nombre;
    private String tipo;

    @Lob
    private byte[] datos;

    @ManyToOne /*muchas imagenes pueden pertenecer a un producto*/
    @JoinColumn(name = "product_id") /* crea la columna product_id en la tabla imagen*/
    private Product product;


}
