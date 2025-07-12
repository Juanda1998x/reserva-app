package com.reserva.backend_reservas.service;

import com.reserva.backend_reservas.dto.CategoryDto;
import com.reserva.backend_reservas.dto.ProductDto;
import com.reserva.backend_reservas.entity.Category;
import com.reserva.backend_reservas.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IcategoryService {

    List<CategoryDto> getAll();
    Category createCategory(Category category);
    Optional<CategoryDto> findById(Long id)throws ResourceNotFoundException;

}
