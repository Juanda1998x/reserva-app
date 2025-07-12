package com.reserva.backend_reservas.dto;

import com.reserva.backend_reservas.entity.Product;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoryDto {
    private long id;
    private  String name;
    private String imageUrl;



}
