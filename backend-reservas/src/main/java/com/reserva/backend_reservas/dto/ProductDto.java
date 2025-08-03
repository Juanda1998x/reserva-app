package com.reserva.backend_reservas.dto;

import com.reserva.backend_reservas.entity.Category;
import com.reserva.backend_reservas.entity.Characteristics;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductDto {
    private long id;
    private String name;
    private String description;
    private List<String> images;
    private Category category;
    private List<Characteristics> characteristics;
    private Double averageRating;
    private Integer reviewCount;
    private String whatsappNumber;
}

